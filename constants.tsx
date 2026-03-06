
import { User, UserRole, Achievement, PlatformText, PlatformLink, CreativeMedia } from './types';

export const INITIAL_ADMIN: User = {
  id: 'admin-1',
  username: 'admin',
  fullName: 'إدارة منصة مبدعون',
  role: UserRole.ADMIN,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  joinDate: '2017-01-01',
  specialty: ['الإدارة العامة'],
  group: 'الإدارة',
  password: 'admin'
};

const DEFAULT_PWD = '1234';

export const MOCK_MEMBERS: User[] = [
  // --- الماروم ---
  { id: '1', username: '89204Y', fullName: 'معالي حسن', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=89204Y', specialty: ['إبداع'], joinDate: '2022-06-05', group: 'أيسل', password: DEFAULT_PWD },
  { id: '2', username: '59687D', fullName: 'نسيم جعفر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=59687D', specialty: ['إبداع'], joinDate: '2022-06-05', group: 'الماروم', password: DEFAULT_PWD },
  { id: '3', username: '45055W', fullName: 'أفراح ابراهيم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=45055W', specialty: ['إبداع'], joinDate: '2022-06-05', group: 'الماروم', password: DEFAULT_PWD },
  { id: '4', username: '75706T', fullName: 'أمل عوض الكريم الطاهر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=75706T', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '5', username: '660798', fullName: 'امل مبارك محمد عثمان', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=660798', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '6', username: '432701', fullName: 'أحمد الضبوطه', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=432701', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '7', username: '652916', fullName: 'إيمان الوليد عثمان فرج', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=652916', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '8', username: '89946V', fullName: 'إسراء حسن الطيب عيسى', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=89946V', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '9', username: '105698', fullName: 'إيهاب كمال أحمد إبراهيم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=105698', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '10', username: '66862A', fullName: 'البصيري فضل السيد على فضل السيد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=66862A', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '11', username: '20087', fullName: 'حنان بلقاسم على سعد الدين', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=20087', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '12', username: '847120', fullName: 'خالد محمد زكريا', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=847120', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '13', username: '118320', fullName: 'رحيق الطيب على سعد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=118320', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '14', username: '53316H', fullName: 'رزاز التجاني أحمد توكي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=53316H', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '15', username: '763220', fullName: 'رونق عبده المليح مبارك', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=763220', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '16', username: '90163D', fullName: 'سلوان محمود دفع الله بري', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=90163D', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '17', username: '86558V', fullName: 'الطيب المسلمي الجيلي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=86558V', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '18', username: '570600', fullName: 'ميادة خالد دفع الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=570600', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '19', username: '442066', fullName: 'محمد علاء الدين محمد الحسن', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=442066', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '20', username: '84390P', fullName: 'محمد عبد القادر إسماعيل', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=84390P', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '21', username: '66009X', fullName: 'مصطفى رحمه عبدالله علي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=66009X', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '22', username: '787420', fullName: 'محمد أحمد يوسف عبد الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=787420', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '23', username: '48613V', fullName: 'هاجر بكري عثمان على', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=48613V', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '24', username: '71858C', fullName: 'يقين نصر الدين عبد الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=71858C', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '25', username: '94101W', fullName: 'المعز عبدالله محمد حسین', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=94101W', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '26', username: '891531', fullName: 'مجاهد عبد الله سيد أحمد عبد الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=891531', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '27', username: '73680X', fullName: 'شيرين زهم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=73680X', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '28', username: '15204T', fullName: 'النور احمد ناير حماد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=15204T', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '29', username: '17956Y', fullName: 'أوسيلا الحارث أحمد الحاج', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=17956Y', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '30', username: '540710', fullName: 'محمود حمدون حماد حمدون', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=540710', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '31', username: '882696', fullName: 'مزدلفة المهدي بابو فاتح محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=882696', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '32', username: '54035H', fullName: 'عبير عوض علي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=54035H', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '33', username: '67103X', fullName: 'مصطفى سابع صالح ابكر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=67103X', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '34', username: '11044P', fullName: 'خالدة قسم السيد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11044P', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '35', username: '709460', fullName: 'هالة محمد صديق', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=709460', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '36', username: '66419V', fullName: 'فاطمة محمود النور تاي الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=66419V', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '37', username: '704980', fullName: 'سعى خالد احمد كمبلاوي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=704980', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '38', username: '819320', fullName: 'عهد عبد اللطيف', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=819320', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '39', username: '87635L', fullName: 'أمل عامر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=87635L', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '40', username: '17683V', fullName: 'هدياء محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=17683V', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '41', username: '48493W', fullName: 'تعارق حمزة', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=48493W', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '42', username: '73285A', fullName: 'خنساء الزاكي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=73285A', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '43', username: '239295', fullName: 'محمد صلاح دقاش', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=239295', specialty: ['إبداع'], joinDate: '2022-11-19', group: 'الماروم', password: DEFAULT_PWD },
  { id: '44', username: '287395', fullName: 'هالة وهبي حسن محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=287395', specialty: ['إبداع'], joinDate: '2022-11-21', group: 'الماروم', password: DEFAULT_PWD },

  // --- أيسل ---
  { id: '45', username: '649668', fullName: 'لدن على سيد أحمد محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=649668', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '46', username: '86558D', fullName: 'أبي عمار فضل المولى أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=86558D', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '47', username: '71530V', fullName: 'أبوبكر عادل عثمان حسين', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=71530V', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '48', username: '500600', fullName: 'مصطفى الفاضل محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=500600', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '49', username: '589705', fullName: 'ريم مكي محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=589705', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '50', username: '72354A', fullName: 'علا عبد الباقي محمد أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=72354A', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '51', username: '916790', fullName: 'هية صبري محمد الحسن', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=916790', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '52', username: '445218', fullName: 'مرام عبد اللطيف السماني عثمان', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=445218', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '53', username: '603278', fullName: 'داليا حامد فتح الله حامد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=603278', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '54', username: '67519V', fullName: 'حسام الدین رمضان آدم ابراهيم العربي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=67519V', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '55', username: '72731K', fullName: 'فاطمة عادل خليفة محمد خليفة', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=72731K', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '56', username: '564111', fullName: 'نجاة عبد الإله أحمد محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=564111', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '57', username: '253258', fullName: 'محمد كمال محمد أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=253258', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '58', username: '44513Y', fullName: 'خالد الوائق خالد نور الدائم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=44513Y', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '59', username: '30979W', fullName: 'روان شمس الدين الجيلي حمد السيد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=30979W', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },
  { id: '60', username: '93226F', fullName: 'إبراهيم المعتر دفع الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=93226F', specialty: ['إبداع'], joinDate: '2023-07-08', group: 'أيسل', password: DEFAULT_PWD },

  // --- ميال ---
  { id: '61', username: '986062', fullName: 'أبو بكر عثمان سالم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=986062', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '62', username: '24837R', fullName: 'أحمد بشير أحمد البشير', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=24837R', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '63', username: '58625L', fullName: 'احمد جمعة أحمد عمر أمير', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=58625L', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '64', username: '885231', fullName: 'اسراء عبد الله الفضل', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=885231', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '65', username: '426791', fullName: 'إسراء يوسف الأمين عبد الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=426791', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '66', username: '84046F', fullName: 'اسلام معتصم الصادق جميل', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=84046F', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '67', username: '60878L', fullName: 'الاء جعفر سليمان فرح', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=60878L', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '68', username: '81548Y', fullName: 'أم سلمة الطيب الهوبرا', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=81548Y', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '69', username: '707490', fullName: 'امنية محمد أحمد عمر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=707490', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },
  { id: '70', username: '84721H', fullName: 'يسمة كمال إمام أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=84721H', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'ميال', password: DEFAULT_PWD },

  // --- كلينور ---
  { id: '71', username: '11732K', fullName: 'امنة عثمان مختار عثمان', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11732K', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '72', username: '720890', fullName: 'احمد عوض الكريم عبد الله على', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=720890', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '73', username: '931820', fullName: 'براءة حافظ خلف الله بابكر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=931820', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '74', username: '605558', fullName: 'ميساء جلال حيدر حسن', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=605558', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '75', username: '934966', fullName: 'محمد زكرنا بخاري محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=934966', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '76', username: '163030', fullName: 'محمد الضو عبد الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=163030', specialty: ['إبداع'], joinDate: '2023-11-19', group: 'كلينور', password: DEFAULT_PWD },
  { id: '77', username: '82118M', fullName: 'مثال نجم الدین عبدالله حماد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=82118M', specialty: ['إبداع'], joinDate: '2023-11-20', group: 'كلينور', password: DEFAULT_PWD },

  // --- سيليا ---
  { id: '78', username: '76527M', fullName: 'عنوان عثمان على عمر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=76527M', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'سيليا', password: DEFAULT_PWD },
  { id: '79', username: '859120', fullName: 'مروه مصطفى المبارك أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=859120', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'سيليا', password: DEFAULT_PWD },
  { id: '80', username: '25470Y', fullName: 'مسجد آدم زكريا علي', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=25470Y', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'سيليا', password: DEFAULT_PWD },
  { id: '81', username: '753262', fullName: 'بتول محمد شريف إدريس', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=753262', specialty: ['إبداع'], joinDate: '2024-09-02', group: 'سيليا', password: DEFAULT_PWD },

  // --- أوريلا ---
  { id: '82', username: '41205A', fullName: 'محمد آدم محمد آدم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=41205A', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'أوريلا', password: DEFAULT_PWD },
  { id: '83', username: '494288', fullName: 'رحيق جمال أحمد فضل الله', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=494288', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'أوريلا', password: DEFAULT_PWD },
  { id: '84', username: '617209', fullName: 'هالة حمزة مصطفى محمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=617209', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'أوريلا', password: DEFAULT_PWD },
  { id: '85', username: '953838', fullName: 'كمال الدين عبد الرازق عبد الله النعيم', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=953838', specialty: ['إبداع'], joinDate: '2024-06-12', group: 'أوريلا', password: DEFAULT_PWD },

  // --- الإشراف ---
  { id: '86', username: '31565L', fullName: 'محمد أنور على', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=31565L', specialty: ['إبداع'], joinDate: '2018-05-01', group: 'الإشراف', password: DEFAULT_PWD },
  { id: '87', username: '85193G', fullName: 'عبد الرحيم إبراهيم أحمد', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=85193G', specialty: ['إبداع'], joinDate: '2020-04-18', group: 'الإشراف', password: DEFAULT_PWD },
  { id: '88', username: '280800', fullName: 'ايناس صلاح الدين سليمان ابشر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=280800', specialty: ['إبداع'], joinDate: '2020-06-27', group: 'الإشراف', password: DEFAULT_PWD },
  { id: '89', username: '783881', fullName: 'عزة عبد الله الفكي عمر', role: UserRole.MEMBER, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=783881', specialty: ['إبداع'], joinDate: '2020-06-27', group: 'الإشراف', password: DEFAULT_PWD }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    userId: 'admin-1',
    title: 'مهرجان الإبداع الشبابي الأول',
    description: 'تنظيم أكبر تجمع للمبدعين الشباب بمشاركة أكثر من 200 عمل فني في الخرطوم.',
    date: '2023-11-10',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000&auto=format&fit=crop'
  }
];

export const INITIAL_TEXTS: PlatformText[] = [
  {
    id: 't1',
    title: 'رسالة إلى النيل',
    content: 'أيها النيل الذي يسري في عروقنا، حاملاً حكايا الأجداد وأحلام الأحفاد، أنت الشاهد على صمودنا وإبداعنا الذي لا ينضب.',
    author: 'محمد أنور علي',
    category: 'نثر',
    date: '2023-12-01'
  }
];

export const INITIAL_LINKS: PlatformLink[] = [
  { id: 'l1', label: 'فيسبوك المنصة', url: 'https://www.facebook.com/share/1B6WtDpPar/', category: 'Facebook' },
  { id: 'l2', label: 'انستجرام المنصة', url: 'https://www.instagram.com/creative_platform12?igsh=YzZ0YnM3bG81M2dp', category: 'Instagram' },
  { id: 'l3', label: 'تليجرام للتواصل', url: 'https://t.me/Sudanese_creators', category: 'Telegram' }
];

export const INITIAL_MEDIA: CreativeMedia[] = [
  { id: 'i1', type: 'image', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500&auto=format&fit=crop', title: 'لوحة: شمس الخرطوم', creator: 'سارة محمد' }
];
