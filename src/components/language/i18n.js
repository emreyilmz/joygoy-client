import i18next, { init } from 'i18next';
import english from "./english.json";
import arabic from './arabic.json';
import bengali from './bengali.json';
import czech from './czech.json';
import german from './german.json';
import greek from './greek.json';
import spanish from './spanish.json';
import french from './french.json';
import hindi from './hindi.json';
import hungarian from './hungarian.json';
import indonesian from './indonesian.json';
import italian from './italian.json';
import japanese from './japanese.json';
import korean from './korean.json';
import dutch from './dutch.json';
import polish from './polish.json';
import portuguese from './portuguese.json';
import romanian from './romanian.json';
import russian from './russian.json';
import thai from './thai.json';
import filipino from './filipino.json';
import ukrainian from './ukrainian.json';
import vietnamese from './vietnamese.json';
import chinese from './chinese.json';
import turkish from './turkish.json';



import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng:'en',
    resources:{
        en:english,
        tr:turkish,
        ar:arabic,
        bn:bengali,
        cs:czech,
        de:german,
        el:greek,
        es:spanish,
        fr:french,
        hi:hindi,
        hu:hungarian,
        id:indonesian,
        it:italian,
        ja:japanese,
        ko:korean,
        nl:dutch,
        pl:polish,
        pt:portuguese,
        ro:romanian,
        ru:russian,
        th:thai,
        tl:filipino,
        uk:ukrainian,
        vi:vietnamese,
        cn:chinese,
        
    },
    react:{
        useSuspense:false,
    }
})