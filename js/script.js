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


//URLS E KEY ID
const urlClima = "https://api.openweathermap.org/data/2.5/weather?q="

//FUNÇÕES

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
        console.log(dataJson)
        setValores(dataJson)
    } else {
        alert("Desculpe, não achamos a Cidade!")
    }

}
const setValores = (data) => { 
    boxResult.classList.replace('hidden', 'show');
    nomeCidade.innerText = data.name +" - " + data.sys.country ;
    temp.innerText = parseInt(data.main.temp);
    imgTemp.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    descricaoTemp.innerText = data.weather[0].description.toUpperCase() 
    umidade.innerText = data.main.humidity + "%"
    velocidade.innerText = `${data.wind.speed}km/h` 
}

//EVENTOS
btnBuscar.addEventListener('click', () => {
    if(inpLocalizacao.value.length == 0){
        alert("Campo Vazio favor Preencher")
    }else{
        const cidade = inpLocalizacao.value;
        getClima(cidade);
    }

})
