(function(){
const modal=document.getElementById('showcaseGameModal'),root=document.getElementById('showcaseGameContent');
const menu=()=>Array.isArray(window.pickoutMenu)?window.pickoutMenu:(typeof pickoutMenu!=='undefined'?pickoutMenu:[]);
const items=()=>menu().filter(p=>Array.isArray(p)&&p[1]&&Number(p[2])>0);
const random=a=>a[Math.floor(Math.random()*a.length)];
const money=n=>Number(n).toLocaleString('ar-EG',{maximumFractionDigits:2})+' ج.م';
function result(text){document.getElementById('showcaseResult').textContent=text;}
window.closeShowcaseGame=()=>{modal.style.display='none';root.innerHTML='';};
window.showcaseGame=type=>{
modal.style.display='flex';
const titles={ai:'🤖 AI يقترحلك',spin:'✨ مزاجك علينا',payer:'🧾 مين يحاسب؟',split:'🧮 نقسم الحساب'};
let body='';
if(type==='split')body='<label>قيمة الحساب (جنيه)</label><input id="sgAmount" type="number" min="0" step=".01" placeholder="مثلاً 450"><label>عدد الأشخاص</label><input id="sgPeople" type="number" min="1" step="1" value="3"><label>خدمة أو ضريبة إضافية (%)</label><input id="sgTax" type="number" min="0" step=".1" value="0"><button onclick="showcaseAction(\'split\')">احسب</button>';
if(type==='payer')body='<label>أسماء الشلة (افصل بينهم بفاصلة)</label><textarea id="sgNames" rows="3" placeholder="أحمد، سارة، يوسف، مريم"></textarea><label>عدد اللي هيحاسبوا</label><select id="sgCount"><option value="1">شخص واحد</option><option value="2">شخصين</option><option value="3">3 أشخاص</option></select><button onclick="showcaseAction(\'payer\')">🎡 لف العجلة</button>';
if(type==='spin')body='<p>هنختارلك صنف مفاجأة من المنيو!</p><button onclick="showcaseAction(\'spin\')">✨ اختارلي</button>';
if(type==='ai')body='<label>مودك إيه؟</label><select id="sgMood"><option value="any">فاجئني</option><option value="hot">محتاج حاجة دافية</option><option value="cold">عايز حاجة ساقعة</option><option value="sweet">نفسي في حاجة حلوة</option></select><button onclick="showcaseAction(\'ai\')">اقترحلي</button>';
root.innerHTML='<h2>'+titles[type]+'</h2><div class="sg-form">'+body+'<p id="showcaseResult" role="status" aria-live="polite"></p></div>';
};
window.showcaseAction=type=>{
if(type==='split'){const amount=Number(document.getElementById('sgAmount').value),people=Number(document.getElementById('sgPeople').value),tax=Number(document.getElementById('sgTax').value);if(!Number.isFinite(amount)||amount<=0||!Number.isInteger(people)||people<1||!Number.isFinite(tax)||tax<0){result('ادخل مبلغ صحيح وعدد أشخاص أكبر من صفر');return;}result('الإجمالي: '+money(amount*(1+tax/100))+' — نصيب الفرد: '+money(amount*(1+tax/100)/people));return;}
if(type==='payer'){const names=[...new Set(document.getElementById('sgNames').value.split(/[,،\n]+/).map(x=>x.trim()).filter(Boolean))];const count=Number(document.getElementById('sgCount').value);if(names.length<2){result('اكتب اسمين على الأقل');return;}const winners=[...names].sort(()=>Math.random()-.5).slice(0,Math.min(count,names.length));result('🎉 اللي هيحاسب: '+winners.join('، '));return;}
let products=items();if(type==='ai'){const mood=document.getElementById('sgMood').value;const filtered=products.filter(p=>mood==='hot'?p[0].includes('ساخنة'):mood==='cold'?p[0].includes('باردة')||p[0].includes('عصائر'):mood==='sweet'?p[0].includes('حلويات'):true);if(filtered.length)products=filtered;}
if(!products.length){result('المنيو غير متاح حاليًا');return;}const p=random(products);result('☕ '+p[1]+' — '+money(p[2]));
};
const css=document.createElement('style');css.textContent='.sg-form{display:grid;gap:12px;margin-top:15px}.sg-form label{font-weight:700}.sg-form input,.sg-form select,.sg-form textarea{width:100%;box-sizing:border-box;border:1px solid #9d795b;border-radius:12px;padding:12px;background:#f9f3eb;color:#24140c;font:inherit}.sg-form button{background:#27b765;border:0;border-radius:12px;padding:13px;color:white;font:inherit;font-weight:bold;cursor:pointer}.sg-form #showcaseResult{font-weight:700;font-size:1.15rem;line-height:1.8}';document.head.appendChild(css);
})();