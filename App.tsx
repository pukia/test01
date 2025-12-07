import React, { useState } from 'react';
import { 
  Camera, 
  CalendarDays, 
  HelpCircle, 
  Users, 
  Home, 
  Instagram, 
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { SCENES, RULES, FAQ, PHOTOGRAPHERS } from './constants';
import { Tab, BookingFormState, Scene } from './types';

// --- Components ---

// 1. Navigation Bar
const NavBar = ({ currentTab, setTab }: { currentTab: Tab; setTab: (t: Tab) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: Tab.SCENES, label: '攝影棚景', icon: <Camera size={18} /> },
    { id: Tab.RULES, label: '預約須知', icon: <CalendarDays size={18} /> },
    { id: Tab.FAQ, label: '常見問題', icon: <HelpCircle size={18} /> },
    { id: Tab.PHOTOGRAPHERS, label: '特約攝影', icon: <Users size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-primary-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            className="font-bold text-xl text-primary-800 flex items-center cursor-pointer"
            onClick={() => setTab(Tab.SCENES)}
          >
            <span className="bg-primary-100 p-2 rounded-full mr-2 text-primary-600">
              <Camera size={24} />
            </span>
            Etheria Studio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${
                    currentTab === item.id
                      ? 'bg-primary-100 text-primary-800 shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
               onClick={() => setTab(Tab.BOOKING)}
               className="ml-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              立即預約
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left py-3 px-2 text-sm font-medium border-b border-slate-50 last:border-0 flex items-center gap-3
                ${currentTab === item.id ? 'text-primary-600 bg-primary-50 rounded-lg' : 'text-slate-600'}`}
            >
               {item.icon}
               {item.label}
            </button>
          ))}
           <button
               onClick={() => {
                 setTab(Tab.BOOKING);
                 setIsMobileMenuOpen(false);
               }}
               className="w-full text-center mt-3 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-md"
            >
              立即預約
            </button>
        </div>
      )}
    </nav>
  );
};

// 2. Scene Card Component
const SceneCard: React.FC<{ scene: Scene; onBook: () => void }> = ({ scene, onBook }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={scene.image} 
          alt={scene.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-800 shadow-sm">
          {scene.id}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-slate-800">{scene.title}</h3>
          <span className="text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full text-sm">
            {scene.price}
          </span>
        </div>
        <div className="flex-grow overflow-y-auto max-h-48 custom-scroll pr-2 mb-6">
          <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line text-justify">
            {scene.description}
          </p>
        </div>
        <button 
          onClick={onBook}
          className="w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-primary-100 hover:text-primary-700 transition-colors mt-auto"
        >
          預約此棚景
        </button>
      </div>
    </div>
  );
};

// 3. Booking Form Component
const BookingForm = ({ preSelectedScene }: { preSelectedScene: string }) => {
  const [formData, setFormData] = useState<BookingFormState>({
    name: '',
    email: '',
    scene: preSelectedScene || SCENES[0].title,
    date: '',
    props: 'no',
    photographer: 'no',
    remarks: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCancel = () => {
    if(window.confirm('確定要取消填寫嗎？')) {
      setFormData({
        name: '',
        email: '',
        scene: SCENES[0].title,
        date: '',
        props: 'no',
        photographer: 'no',
        remarks: '',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform transition-all scale-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">預約送出成功</h3>
          <p className="text-slate-500 mb-6">感謝您的預約！我們會盡快透過 Email 與您確認檔期。</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
          >
            關閉視窗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">預約單</h2>
        <p className="text-slate-500">請填寫詳細資訊，我們將為您保留最美好的時光</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">姓名</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              placeholder="您的稱呼"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">預約棚景</label>
            <select 
              value={formData.scene}
              onChange={(e) => setFormData({...formData, scene: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
            >
              {SCENES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">預約日期</label>
            <input 
              required
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-slate-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">額外出租道具</label>
            <select 
              value={formData.props}
              onChange={(e) => setFormData({...formData, props: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
            >
              <option value="no">不需要</option>
              <option value="lights">專業閃燈組 (+NT$500)</option>
              <option value="smoke">煙霧機 (+NT$300)</option>
              <option value="both">閃燈 + 煙霧機 (+NT$700)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">特約攝影師</label>
            <select 
              value={formData.photographer}
              onChange={(e) => setFormData({...formData, photographer: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
            >
              <option value="no">不需要（自行拍攝）</option>
              {PHOTOGRAPHERS.map(p => <option key={p.id} value={p.name}>{p.name} ({p.style})</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">備註</label>
          <textarea 
            rows={4}
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            placeholder="有什麼特殊需求或是想告知我們的事項..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button" 
            onClick={handleCancel}
            className="flex-1 py-3 px-6 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            取消重填
          </button>
          <button 
            type="submit" 
            className="flex-[2] py-3 px-6 rounded-xl bg-primary-600 text-white font-bold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all"
          >
            確認送出預約
          </button>
        </div>
      </form>
    </div>
  );
};

// 4. Main Views
const ScenesView = ({ onBook }: { onBook: (sceneName: string) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
    {SCENES.map((scene) => (
      <SceneCard key={scene.id} scene={scene} onBook={() => onBook(scene.title)} />
    ))}
  </div>
);

const RulesView = () => (
  <div className="max-w-3xl mx-auto space-y-8">
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <CalendarDays className="text-primary-500" />
        預約與使用須知
      </h2>
      <ul className="space-y-4">
        {RULES.map((rule, idx) => (
          <li key={idx} className="flex gap-4 text-slate-600 leading-relaxed p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FaqView = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">常見問答 Q&A</h2>
    {FAQ.map((item, idx) => (
      <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-primary-800 mb-3 flex items-start gap-3">
          <HelpCircle className="text-primary-400 shrink-0 mt-1" size={20} />
          {item.question}
        </h3>
        <p className="text-slate-600 pl-8 leading-relaxed border-l-2 border-slate-100 ml-2.5">
          {item.answer}
        </p>
      </div>
    ))}
  </div>
);

const PhotographersView = () => (
  <div className="space-y-10">
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">特約攝影師</h2>
      <p className="text-slate-500">我們與多位風格獨特的攝影師合作，為您捕捉最完美的瞬間</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PHOTOGRAPHERS.map((p) => (
        <div key={p.id} className="bg-white rounded-3xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-primary-50 group-hover:ring-primary-100 transition-all">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{p.name}</h3>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold mb-4">
            Specialist
          </span>
          <p className="text-slate-500 text-sm">{p.style}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.SCENES);
  const [selectedSceneForBooking, setSelectedSceneForBooking] = useState<string>('');

  const handleBookScene = (sceneTitle: string) => {
    setSelectedSceneForBooking(sceneTitle);
    setCurrentTab(Tab.BOOKING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentTab) {
      case Tab.SCENES:
        return <ScenesView onBook={handleBookScene} />;
      case Tab.RULES:
        return <RulesView />;
      case Tab.FAQ:
        return <FaqView />;
      case Tab.PHOTOGRAPHERS:
        return <PhotographersView />;
      case Tab.BOOKING:
        return <BookingForm preSelectedScene={selectedSceneForBooking} />;
      default:
        return <ScenesView onBook={handleBookScene} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <NavBar currentTab={currentTab} setTab={handleTabChange} />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 p-4 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-2">
          <button 
            onClick={() => handleTabChange(Tab.SCENES)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition-colors"
          >
            <Home size={20} />
            <span className="hidden sm:inline">返回首頁</span>
          </button>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition-opacity text-sm font-bold"
              onClick={(e) => { e.preventDefault(); alert('Redirect to Instagram'); }}
            >
              <Instagram size={18} />
              Instagram
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-[#06C755] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition-opacity text-sm font-bold"
              onClick={(e) => { e.preventDefault(); alert('Redirect to LINE'); }}
            >
              <MessageCircle size={18} />
              LINE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;