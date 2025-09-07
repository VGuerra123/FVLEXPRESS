import React from 'react';
import { Calendar, Users, MapPin, Award, Target, Eye, Heart, TrendingUp, Shield, Zap, Star } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;

  const stats = [
    { 
      icon: Calendar, 
      label: t('foundedIn'), 
      value: '2023', 
      gradient: 'from-blue-500 to-sky-500',
      bgColor: 'bg-blue-50',
      description: language === 'es' ? 'F&V Logistics Express' : language === 'en' ? 'F&V Logistics Express' : '年经验'
    },
    { 
      icon: Award, 
      label: t('packagesDelivered'), 
      value: '+ 1.7M', 
      gradient: 'from-sky-500 to-cyan-500',
      bgColor: 'bg-sky-50',
      description: language === 'es' ? 'Entregas exitosas' : language === 'en' ? 'Successful deliveries' : '成功交付'
    },
    { 
      icon: MapPin, 
      label: t('Comunas'), 
      value: '52', 
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      description: language === 'es' ? 'Cobertura RM' : language === 'en' ? 'RM communes ' : '覆盖的RM社区'
    },
    { 
      icon: Users, 
      label: t('satisfiedClients'), 
      value: '+500', 
      gradient: 'from-blue-600 to-sky-600',
      bgColor: 'bg-blue-50',
      description: language === 'es' ? 'Valoración' : language === 'en' ? 'Active clients' : '活跃客户'
    },
  ];

  const values = [
    {
      icon: Target,
      title: t('missionTitle'),
      description: t('missionDescription'),
      gradient: 'from-blue-500 to-sky-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Eye,
      title: t('visionTitle'),
      description: t('visionDescription'),
      gradient: 'from-sky-500 to-cyan-500',
      bgColor: 'bg-sky-50'
    }
  ];

  const timeline = [
    { 
      year: '2021', 
      event: language === 'es' ? 'Fundación de F&V Transportes' : language === 'en' ? 'F&V Logistics Foundation' : 'F&V物流成立',
      description: language === 'es' ? 'Prestación de servicios de ultima milla en Santiago.' : language === 'en' ? 'Start of operations in Santiago' : '在圣地亚哥开始运营',
      gradient: 'from-blue-500 to-sky-500' 
    },
    { 
      year: '2022', 
      event: language === 'es' ? 'Expansión RM' : language === 'en' ? 'RM Expansion' : 'RM扩张',
      description: language === 'es' ? 'Cobertura completa de 52 comunas.' : language === 'en' ? 'Complete coverage of 52 communes' : '覆盖52个社区',
      gradient: 'from-sky-500 to-cyan-500' 
    },
        { 
      year: '2023', 
      event: language === 'es' ? 'Fundación F&V Logistics Express' : language === 'en' ? 'Warehouse Services' : '仓库服务',
      description: language === 'es' ? 'Prestación de servicios de bodega para Pymes de RM y ultima milla, sumado a la Fundación de F&V Logistics Express.' : language === 'en' ? 'Launch of business plans' : '推出商业计划',
      gradient: 'from-blue-600 to-sky-600' 
    },
        { 
      year: '2024', 
      event: language === 'es' ? 'Líderes de última milla' : language === 'en' ? 'Market Leaders' : '市场领导者',
      description: language === 'es' ? '1.7M+ paquetes entregados.' : language === 'en' ? '2.5M+ packages delivered' : '交付2.5M+包裹',
      gradient: 'from-sky-600 to-cyan-600' 
    },
    { 
      year: '2025', 
      event: language === 'es' ? 'Tecnología de Vanguardia con IA' : language === 'en' ? 'AI Technology' : '人工智能技术',
      description: language === 'es' ? 'Implementación de APP de monitoreo central de operaciones y APP del conductor para la entrega al cliente final y optimización de rutas inteligentes con IA.' : language === 'en' ? 'Smart routing implementation' : '智能路由实施',
      gradient: 'from-cyan-500 to-blue-500' 
    },


  ];

  const achievements = [
    {
      icon: TrendingUp,
      title: language === 'es' ? 'Crecimiento Sostenido' : language === 'en' ? 'Sustained Growth' : '持续增长',
      value: '150%',
      description: language === 'es' ? 'Crecimiento anual promedio' : language === 'en' ? 'Average annual growth' : '年均增长',
      gradient: 'from-blue-500 to-sky-500'
    },
    {
      icon: Shield,
      title: language === 'es' ? 'Efectividad' : language === 'en' ? 'Reliability' : '可靠性',
      value: '98%',
      description: language === 'es' ? 'Tasa de entrega exitosa' : language === 'en' ? 'Successful delivery rate' : '成功交付率',
      gradient: 'from-sky-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Velocidad' : language === 'en' ? 'Speed' : '速度',
      value: '6.4h',
      description: language === 'es' ? 'Tiempo promedio de entrega' : language === 'en' ? 'Average delivery time' : '平均交付时间',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-blue-50/50 to-sky-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-soft mb-6">
            <Heart className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">
              {language === 'es' ? 'Nuestra Historia' : language === 'en' ? 'Our Story' : '我们的故事'}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-900 mb-6">
            <span className="bg-gradient-to-r from-blue-800 to-sky-600 bg-clip-text text-transparent">
              {t('aboutTitle')}
            </span>
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('aboutSubtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto rounded-full" />
        </div>

        {/* Story & Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Story Content */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 hover:shadow-medium transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center shadow-soft">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  {language === 'es' ? 'Nuestra Pasión' : language === 'en' ? 'Our Passion' : '我们的热情'}
                </h3>
              </div>
              <p className="text-blue-800 leading-relaxed text-lg">
                {t('aboutDescription')}
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`${value.bgColor}/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 hover:shadow-medium transition-all duration-500 transform hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h4>
                      <p className="text-blue-800 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Achievements */}
          <div className="space-y-8">
            
            {/* Timeline */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 hover:shadow-medium transition-all duration-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {language === 'es' ? 'Nuestro Crecimiento' : language === 'en' ? 'Our Growth' : '我们的成长'}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto rounded-full" />
              </div>
              
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                      {item.year}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-blue-900 mb-1 group-hover:text-sky-700 transition-colors duration-300">
                        {item.event}
                      </h5>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-200/50 hover:shadow-medium transition-all duration-500 transform hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${achievement.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-black text-blue-900 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                    {achievement.value}
                  </div>
                  <h6 className="font-bold text-blue-900 mb-1">
                    {achievement.title}
                  </h6>
                  <p className="text-blue-700 text-sm">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${stat.bgColor}/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 hover:shadow-strong transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-blue-900 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                  {stat.value}
                </div>
                <p className="text-blue-900 font-semibold mb-1">{stat.label}</p>
                <p className="text-blue-700 text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-sky-50 rounded-3xl border border-blue-200/50 shadow-soft">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-soft mb-6">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">
              {language === 'es' ? 'Únete a Nosotros' : language === 'en' ? 'Join Us' : '加入我们'}
            </span>
          </div>
          
          <h4 className="text-2xl font-bold text-blue-900 mb-4">
            {language === 'es' ? '¿Listo para formar parte de nuestra historia?' : 
             language === 'en' ? 'Ready to be part of our story?' : 
             '准备成为我们故事的一部分吗？'}
          </h4>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            {language === 'es' ? 'Únete a miles de empresas que confían en F&V Logistics Express para sus necesidades de logística y almacenamiento.' : 
             language === 'en' ? 'Join thousands of companies that trust F&V Logistics Express for their logistics and storage needs.' : 
             '加入数千家信任F&V物流快递满足其物流和存储需求的公司。'}
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-strong">
            {language === 'es' ? 'Comenzar Ahora' : 
             language === 'en' ? 'Get Started Now' : 
             '立即开始'}
          </button>
        </div>
      </div>
    </section>
  );
};