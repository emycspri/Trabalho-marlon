const slides = document.querySelectorAll(".slide");
const next = document.querySelectorAll(".next");
const prev = document.querySelectorAll(".prev");
const progressBar = document.getElementById("progressBar");

let index = 0;
let total = 0;
update();

// Atualiza transição dos slides
function update(){
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
    progressBar.style.width = ((index+1)/slides.length)*100+"%";
}

// Avançar slide
next.forEach(btn=>{
    btn.onclick=()=>{

        // impede avançar sem escolher valor
        const radios = slides[index].querySelectorAll("input[type=radio]");
        let marcado = false;

        radios.forEach(r=>{
            if(r.checked){
                total += Number(r.value);
                marcado = true;
                r.checked = false; // limpa para não somar de novo
            }
        });

        if(btn.classList.contains("finish")){ // se for botão final
            mostrarResultado();
            index++;
            update();
            return;
        }

        if(!marcado){
            alert("Selecione uma resposta antes de continuar.");
            return;
        }

        if(index < slides.length-1) index++;
        update();
    }
});

// Voltar slide
prev.forEach(btn=>{
    btn.onclick=()=>{
        if(index>0) index--;
        update();
    }
});

// 🔥 Função final de resultado
function mostrarResultado(){
    document.getElementById("resultadoValor").innerText = total;

    let msg = "";

    if(total <= 120) msg = "Você possui níveis moderados, seu desenvolvimento é consistente com espaço para evolução.";
    else if(total <= 240) msg = "Bom desempenho! Indica força mental e estabilidade acima da média.";
    else msg = "Excelência total! Sua capacidade emocional e cognitiva é extremamente elevada.";

    document.getElementById("interpretacao").innerText = msg;
}
