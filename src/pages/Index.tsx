import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Movie {
  id: number;
  title: string;
  year: string;
  rating: string;
  image: string;
  category: string;
  quality: string;
}

const mockMovies: Movie[] = [
  { id: 1, title: 'Невероятные приключения Шурика', year: '2025', rating: '8.2', image: 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Шурик', category: 'russian', quality: 'HDRip' },
  { id: 2, title: 'Горыныч', year: '2025', rating: '7.8', image: 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Горыныч', category: 'russian', quality: 'BDRip' },
  { id: 3, title: 'Позывной: Альфа', year: '2025', rating: '8.5', image: 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Альфа', category: 'series', quality: 'WEB-DL' },
  { id: 4, title: 'Ночной администратор', year: '2025', rating: '8.1', image: 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Админ', category: 'series', quality: 'HDRip' },
  { id: 5, title: 'Атака титанов: Финал', year: '2025', rating: '9.1', image: 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Титаны', category: 'anime', quality: 'WEB-DL' },
  { id: 6, title: 'Магическая битва', year: '2025', rating: '8.8', image: 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Магия', category: 'anime', quality: 'HDRip' },
  { id: 7, title: 'Дюна: Часть третья', year: '2025', rating: '8.9', image: 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Дюна', category: 'hdrip', quality: 'HDRip' },
  { id: 8, title: 'Матрица: Воскрешение 2', year: '2025', rating: '8.3', image: 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Матрица', category: 'hdrip', quality: 'BDRip' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('profile1');
  const [favorites, setFavorites] = useState<number[]>([]);

  const profiles = [
    { id: 'profile1', name: 'Профиль 1', avatar: '👤' },
    { id: 'profile2', name: 'Профиль 2', avatar: '👨' },
    { id: 'profile3', name: 'Профиль 3', avatar: '👩' },
  ];

  const categories = [
    { id: 'all', label: 'Все', icon: 'Tv' },
    { id: 'series', label: 'Сериалы', icon: 'Film' },
    { id: 'hdrip', label: 'HDRip', icon: 'Video' },
    { id: 'russian', label: 'Наше кино', icon: 'Star' },
    { id: 'anime', label: 'Аниме', icon: 'Sparkles' },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'home' || activeTab === 'categories' || movie.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const favoriteMovies = mockMovies.filter(movie => favorites.includes(movie.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="Play" className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                UltraTV
              </h1>
            </div>

            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger className="w-48 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {profiles.map(profile => (
                  <SelectItem key={profile.id} value={profile.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{profile.avatar}</span>
                      <span>{profile.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-card/50 backdrop-blur p-2 h-auto gap-2">
            <TabsTrigger value="home" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Home" size={20} />
              <span className="font-semibold">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Search" size={20} />
              <span className="font-semibold">Поиск</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Grid3x3" size={20} />
              <span className="font-semibold">Категории</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Heart" size={20} />
              <span className="font-semibold">Избранное</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Settings" size={20} />
              <span className="font-semibold">Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="mt-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">🔥 Популярное сейчас</h2>
                <Button variant="ghost" className="gap-2">
                  <span>Все</span>
                  <Icon name="ChevronRight" size={18} />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {mockMovies.slice(0, 5).map(movie => (
                  <Card 
                    key={movie.id} 
                    className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[2/3]">
                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">{movie.quality}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 left-3 bg-black/50 hover:bg-primary text-white"
                          onClick={() => toggleFavorite(movie.id)}
                        >
                          <Icon name="Heart" size={18} className={favorites.includes(movie.id) ? 'fill-primary text-primary' : ''} />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                            <Icon name="Play" size={18} />
                            Смотреть
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{movie.title}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{movie.year}</span>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-accent fill-accent" />
                            <span className="text-accent font-semibold">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">📺 Новые сериалы</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {mockMovies.filter(m => m.category === 'series').map(movie => (
                  <Card 
                    key={movie.id} 
                    className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[2/3]">
                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">{movie.quality}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 left-3 bg-black/50 hover:bg-primary text-white"
                          onClick={() => toggleFavorite(movie.id)}
                        >
                          <Icon name="Heart" size={18} className={favorites.includes(movie.id) ? 'fill-primary text-primary' : ''} />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                            <Icon name="Play" size={18} />
                            Смотреть
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{movie.title}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{movie.year}</span>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-accent fill-accent" />
                            <span className="text-accent font-semibold">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="mt-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
                <Input
                  placeholder="Поиск фильмов, сериалов, аниме..."
                  className="pl-14 pr-4 py-6 text-lg bg-card border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchQuery && (
                <div className="space-y-6">
                  <p className="text-muted-foreground">Найдено: {filteredMovies.length}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map(movie => (
                      <Card 
                        key={movie.id} 
                        className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <CardContent className="p-0">
                          <div className="relative aspect-[2/3]">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">{movie.quality}</Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-3 left-3 bg-black/50 hover:bg-primary text-white"
                              onClick={() => toggleFavorite(movie.id)}
                            >
                              <Icon name="Heart" size={18} className={favorites.includes(movie.id) ? 'fill-primary text-primary' : ''} />
                            </Button>
                          </div>
                          <div className="p-4 space-y-2">
                            <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{movie.title}</h3>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{movie.year}</span>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="text-accent fill-accent" />
                                <span className="text-accent font-semibold">{movie.rating}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="mt-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.filter(c => c.id !== 'all').map(category => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-24 flex-col gap-3 bg-card hover:bg-primary hover:text-primary-foreground border-border hover:border-primary transition-all"
                  onClick={() => setActiveTab(category.id)}
                >
                  <Icon name={category.icon as any} size={32} />
                  <span className="font-semibold">{category.label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Все фильмы и сериалы</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {mockMovies.map(movie => (
                  <Card 
                    key={movie.id} 
                    className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[2/3]">
                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">{movie.quality}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 left-3 bg-black/50 hover:bg-primary text-white"
                          onClick={() => toggleFavorite(movie.id)}
                        >
                          <Icon name="Heart" size={18} className={favorites.includes(movie.id) ? 'fill-primary text-primary' : ''} />
                        </Button>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{movie.title}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{movie.year}</span>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-accent fill-accent" />
                            <span className="text-accent font-semibold">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">❤️ Мое избранное</h2>
              {favoriteMovies.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Icon name="Heart" size={64} className="mx-auto text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">Нет избранных фильмов</p>
                  <p className="text-sm text-muted-foreground">Добавляйте фильмы в избранное, нажав на ❤️</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {favoriteMovies.map(movie => (
                    <Card 
                      key={movie.id} 
                      className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[2/3]">
                          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">{movie.quality}</Badge>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-3 left-3 bg-black/50 hover:bg-primary text-white"
                            onClick={() => toggleFavorite(movie.id)}
                          >
                            <Icon name="Heart" size={18} className="fill-primary text-primary" />
                          </Button>
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{movie.title}</h3>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{movie.year}</span>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-accent fill-accent" />
                              <span className="text-accent font-semibold">{movie.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-foreground">⚙️ Настройки</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Качество видео по умолчанию</label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Автоматическое</SelectItem>
                        <SelectItem value="4k">4K Ultra HD</SelectItem>
                        <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                        <SelectItem value="720p">HD (720p)</SelectItem>
                        <SelectItem value="480p">SD (480p)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Язык интерфейса</label>
                    <Select defaultValue="ru">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Управление профилями</label>
                    <div className="space-y-2">
                      {profiles.map(profile => (
                        <div key={profile.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{profile.avatar}</span>
                            <span className="font-medium text-foreground">{profile.name}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Редактировать
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full gap-2 border-dashed">
                        <Icon name="Plus" size={18} />
                        Добавить профиль
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button variant="destructive" className="w-full">
                      Выйти из аккаунта
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
