// 仮の開催場コードマッピング（将来はAPI取得可）
const venueCodeMap = {
    "函館": "01", "青森": "02", "前橋": "03", "取手": "04",
    "宇都宮": "05", "大宮": "06", "西武園": "07", "京王閣": "08",
    "立川": "09", "松戸": "10", "千葉": "11", "川崎": "12",
    "平塚": "13", "小田原": "14", "伊東": "15", "静岡": "16",
    "名古屋": "17", "岐阜": "18", "豊橋": "19", "四日市": "20",
    "大垣": "21", "富山": "22", "金沢": "23", "福井": "24",
    "奈良": "25", "和歌山": "26", "岸和田": "27", "豊中": "28",
    "広島": "29", "防府": "30", "高松": "31", "小松島": "32",
    "高知": "33", "松山": "34", "小倉": "35", "久留米": "36",
    "佐世保": "37", "別府": "38", "熊本": "39", "武雄": "40",
    "唐津": "41", "玉野": "42"
};

window.onload = function () {
    const venueSelect = document.getElementById("venue");
    for (let venue in venueCodeMap) {
        const opt = document.createElement("option");
        opt.value = venue;
        opt.textContent = venue;
        venueSelect.appendChild(opt);
    }
};

async function predict() {
    const date = document.getElementById("date").value;
    const venue = document.getElementById("venue").value;
    const race = document.getElementById("race").value;
    const venueCode = venueCodeMap[venue];

    if (!venueCode || !date) {
        alert("日付と開催場を選択してください");
        return;
    }

    const race_id = date.replace(/-/g, '') + venueCode + race.padStart(2, '0');

    const res = await fetch(`https://keirin-api.onrender.com/api/predict?race_id=${race_id}`);
    const data = await res.json();

    if (data.trifecta) {
        let html = "<h2>予測結果</h2>";
        html += "<h3>三連単</h3><ul>";
        data.trifecta.forEach(t => {
            html += `<li>${t.order} (${(t.prob * 100).toFixed(1)}%)</li>`;
        });
        html += "</ul><h3>三連複</h3><ul>";
        data.trio.forEach(t => {
            html += `<li>${t.set} (${(t.prob * 100).toFixed(1)}%)</li>`;
        });
        html += `</ul><p><strong>展開:</strong> ${data.scenario}</p>`;
        document.getElementById("result").innerHTML = html;
    } else {
        document.getElementById("result").innerHTML = "<p>現在このレースの予測は利用できません。</p>";
    }
}
