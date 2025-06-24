async function predict() {
    const date = document.getElementById("date").value;
    const venue = document.getElementById("venue").value;
    const race = document.getElementById("race").value;

    const race_id = date.replace(/-/g, '') + '07' + race.padStart(2, '0');

    const res = await fetch(`https://keirin-api.onrender.com/api/predict?race_id=${race_id}`);
    const data = await res.json();

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
}
