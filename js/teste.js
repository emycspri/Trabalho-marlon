const slides = document.querySelectorAll(".slide");
const next = document.querySelectorAll(".next");
const prev = document.querySelectorAll(".prev");
const progressBar = document.getElementById("progressBar");

let index = 0;
let resiliencia = 0;
let inteligencia = 0;
let curso = 0;
let instituicao = 0;
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
                const valor = Number(r.value);
                const nome = r.name;
                
                if(nome === 'resiliencia') resiliencia = valor;
                else if(nome === 'inteligencia') inteligencia = valor;
                else if(nome === 'curso') curso = valor;
                else if(nome === 'instituicao') instituicao = valor;
                
                marcado = true;
            }
        });

        if(btn.classList.contains("finish")){ // se for botão final
            salvarResultado();
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
function salvarResultado(){
    // X = R + I (Resiliência + Inteligência)
    const X = resiliencia + inteligencia;
    
    // Y = C + I (Curso + Instituição)
    const Y = curso + instituicao;
    
    // Salvar no localStorage
    localStorage.setItem('valorX', X);
    localStorage.setItem('valorY', Y);
    
    // Redirecionar para página de resultados
    window.location.href = 'resultados.html';
}
