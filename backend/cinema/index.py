import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Получает подключение к базе данных"""
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: dict, context) -> dict:
    """API для работы с кинотеатром: фильмы, профили, избранное"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('path', '')
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if path == 'movies':
            if method == 'GET':
                category = event.get('queryStringParameters', {}).get('category')
                search = event.get('queryStringParameters', {}).get('search')
                
                query = 'SELECT * FROM movies WHERE 1=1'
                params = []
                
                if category and category != 'all':
                    query += ' AND category = %s'
                    params.append(category)
                
                if search:
                    query += ' AND LOWER(title) LIKE %s'
                    params.append(f'%{search.lower()}%')
                
                query += ' ORDER BY created_at DESC'
                
                cur.execute(query, params)
                movies = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'movies': movies}, default=str),
                    'isBase64Encoded': False
                }
        
        elif path == 'profiles':
            if method == 'GET':
                cur.execute('SELECT * FROM profiles ORDER BY id')
                profiles = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'profiles': profiles}, default=str),
                    'isBase64Encoded': False
                }
        
        elif path == 'favorites':
            if method == 'GET':
                profile_id = event.get('queryStringParameters', {}).get('profile_id')
                if not profile_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'profile_id required'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute('''
                    SELECT m.* FROM movies m
                    INNER JOIN favorites f ON m.id = f.movie_id
                    WHERE f.profile_id = %s
                    ORDER BY f.created_at DESC
                ''', (profile_id,))
                favorites = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'favorites': favorites}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'POST':
                body = json.loads(event.get('body', '{}'))
                profile_id = body.get('profile_id')
                movie_id = body.get('movie_id')
                
                if not profile_id or not movie_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'profile_id and movie_id required'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    'INSERT INTO favorites (profile_id, movie_id) VALUES (%s, %s) ON CONFLICT DO NOTHING RETURNING id',
                    (profile_id, movie_id)
                )
                result = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'id': result['id'] if result else None}),
                    'isBase64Encoded': False
                }
            
            elif method == 'DELETE':
                body = json.loads(event.get('body', '{}'))
                profile_id = body.get('profile_id')
                movie_id = body.get('movie_id')
                
                if not profile_id or not movie_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'profile_id and movie_id required'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    'UPDATE favorites SET id = id WHERE profile_id = %s AND movie_id = %s',
                    (profile_id, movie_id)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Path not found'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
