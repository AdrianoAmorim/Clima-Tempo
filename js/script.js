//Pegando os Elementos da DOM
const inpLocalizacao = document.getElementById('inpLocalizacao');
const boxResult = document.getElementById('boxResult');
const nomeCidade = document.querySelector('#titleResult label');
const temp = document.querySelector('#boxTemperatura label span');
const imgTemp = document.querySelector('#boxTemperatura img');
const descricaoTemp = document.querySelector('#boxTemperatura picture label');
const umidade = document.querySelector('#boxInfoRestantes #umidade label');
const imgUmidade = document.querySelector('#boxInfoRestantes #umidade img');
const velocidade = document.querySelector('#boxInfoRestantes #velocidade label');
const imgVelocidade = document.querySelector('#boxTemperatura #velocidade img');
const btnBuscar = document.getElementById('btnBuscar');
const boxAvisos = document.getElementById('boxAvisos');
const lblAvisos = document.querySelector("#boxAvisos label")


//URLS E KEY ID
const urlClima = "https://api.openweathermap.org/data/2.5/weather?q="

//FUNÇÕES
//FUNÇÃO PARA LIBERAR A ENTRADA NO APP QUANDO TUDO TIVER SIDO CARREGADO
const loading = () =>{
   document.getElementById("background").classList.remove("hidden")
   document.getElementById("background").classList.add("fadeIn")
}
//faz a requisição e pega o clima escolhido e chama funcao para setar os dados
const getClima = async (cidade) => {
    const url = `${urlClima}+${cidade}+&units=metric&lang=pt_br&appid=a44fd137625e071dc722ea150b72725b`

    const data = await fetch(url).then(async res => {
        //testa se a requisicao retorno tudo certo e retorna o resultado
        if (res.ok) {
            return res
        } else {
            //senao ela gera um erro e devolve p catch o status do erro q veio da requisicao
            throw Error(res.statusText)
        }
    }).catch(err => {
        console.log("Erro ao Conectar com a API!- " + err)
    });
    //testa se veio os dados corretamente ou não
    if (data) {
        const dataJson = await data.json();
        setValores(dataJson)
    } else {
        lblAvisos.innerText = "OPS! Cidade Não Encontrada !"
        boxAvisos.classList.remove("hidden");
        boxAvisos.classList.add("showAnimation")

    }

}
//SETA OS VALORES NOS COMPONENTES
const setValores = (data) => { 
    nomeCidade.innerText = data.name +" - " + data.sys.country ;
    temp.innerText = parseInt(data.main.temp);
    imgTemp.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    descricaoTemp.innerText = data.weather[0].description.toUpperCase() 
    umidade.innerText = data.main.humidity + "%"
    velocidade.innerText = `${data.wind.speed}km/h` 
    boxResult.classList.remove("hidden");
    boxResult.classList.add("showAnimation")
}

//EVENTOS
btnBuscar.addEventListener('click', () => {
    if(inpLocalizacao.value.length == 0){
        lblAvisos.innerText = "Campo vazio - Digite o nome da Cidade !"
        boxAvisos.classList.remove("hidden");
        boxAvisos.classList.add("showAnimation")
    }else{
        const cidade = inpLocalizacao.value;
        getClima(cidade);
    }

})

inpLocalizacao.addEventListener("keyup",(e)=>{
    if(e.code === 'Enter'){
        if(inpLocalizacao.value.length == 0){
            lblAvisos.innerText = "Campo vazio - Digite o nome da Cidade !"
            boxAvisos.classList.remove("hidden");
            boxAvisos.classList.add("showAnimation");
        }else{
            const cidade = inpLocalizacao.value;
            getClima(cidade);
        }
    }
})

inpLocalizacao.addEventListener('focus',()=>{
    boxAvisos.classList.remove("showAnimation");
    boxResult.classList.remove("showAnimation");
    boxAvisos.classList.add("hidden");
    boxResult.classList.add("hidden");
})