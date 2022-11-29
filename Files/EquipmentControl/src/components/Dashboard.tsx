import {
    Flex
} from "@chakra-ui/react"; // Importação dos componentes do ChakraUI

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // Importar os componentes necessários para apresentar o dashboard, chart.js é uma biblioteca para gerar dashboard
import { Line } from 'react-chartjs-2'; // Não lembro exatamente o que isso faz, mais foi necessário para funcionar o Chart
import { faker } from '@faker-js/faker'; // Da mesma forma que o Line, não lembro a sua utilização, porém, esse componente faker foi utilizado para corrigir um erro que estava dando ao tentar criar o Chart

// A constante labels armazena os meses do ano para ter um dashboard anual
// TODO: futuramente será necessário criar outras constantes pois a ideia é ter a opção de mostrar o dashboard anual, mensal e semanal
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Constante utilizada para criar as informações de pesquisa, ou seja, aqui informaremos os dados a serem mostrados (até agora temos somente uma linha)
export const data = {
    // Objeto responsavel por criar as informações necessárias
    labels,
    datasets: [
        {
            label: 'Dataset 2', // Nome da minha linha (Do meu dashboard de informação)
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })), //Aqui é onde eu defino de fato meus dados, nessa situação está sendo gerado valores aleatorios entre -1000 a 1000 para serem representados no grafico
            borderColor: 'rgb(53, 162, 235)', //A cor da borda da minha linha do gráfico
            backgroundColor: 'rgba(53, 162, 235, 0.5)', // A cor do background da minha linha do gráfico
        },
    ],
};

// Aqui definimos a estrutura do meu chart, a legenda e o titulo, porpem, tem-se outras opções (não lembro)
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


// Em tese, aqui se registra o Chart, é necessário efetuar isso para "cria-lo"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Minha função principal Dashboard
export function Dashboard() {
    return (
        // Essa DivFlex serve para 
        <Flex
            pos="relative"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
            borderRadius="1.6875rem"
            w="100%"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#f1f1f1 !important"
        >
            {/* Aqui estou chamando meu componente Chart para o mesmo ser renderizado */}
            <Line data={data} options={options} />
        </Flex>
    );
}