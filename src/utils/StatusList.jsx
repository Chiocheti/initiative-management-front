export default function StatusList() {
  return [
    {
      value: 'Abalado',
      message: <p>Pericias -2</p>,
    },
    {
      value: 'Agarrado',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Imóvel: Deslocamento zerado <br /> Só pode atacar com armas leves
          <br /> Ataque -2
        </p>
      ),
    },
    {
      value: 'Alquebrado',
      message: <p>Gastos de Pm +1</p>,
    },
    {
      value: 'Apavorado',
      message: (
        <p>
          Pericias -5 <br /> Não pode se aproximar da fonte do medo
        </p>
      ),
    },
    {
      value: 'Atordoado',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Não pode fazer ações
        </p>
      ),
    },
    {
      value: 'Caído',
      message: (
        <p>
          Ataque corpo a corpo -5 <br /> Deslocamento 1q <br /> Defesa corpo a corpo -5 <br /> Defesa distancia +5
        </p>
      ),
    },
    {
      value: 'Cego',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Lento: Deslocamento pela metade <br /> Não pode correr ou fazer
          investidas <br /> Não pode fazer testes de Percepção para observar <br /> Perícias de Força ou Destreza -5
          <br />
          Todos os alvos de seus ataques recebem camuflagem total
        </p>
      ),
    },
    {
      value: 'Debilitado',
      message: <p>Pericias Físicas -5</p>,
    },
    {
      value: 'Desprevenido',
      message: <p>Desprevenido: Defesa e Reflexos -5</p>,
    },
    {
      value: 'Em Chamas',
      message: <p>1d6 dano de Fogo por turno</p>,
    },
    {
      value: 'Enjoado',
      message: <p>Só pode fazer a ação padrão ou a de movimento</p>,
    },
    {
      value: 'Enredado',
      message: (
        <p>
          Lento: Deslocamento pela metade <br /> Vulnerável: Defesa -2 <br /> Ataque -2
        </p>
      ),
    },
    {
      value: 'Esmorecido',
      message: <p>Pericias Mentais -5</p>,
    },
    {
      value: 'Exausto',
      message: (
        <p>
          Debilitado: Pericias Físicas -5 <br /> Lento: Deslocamento pela metade <br /> Vulnerável: Defesa -2
        </p>
      ),
    },
    {
      value: 'Fatigado',
      message: (
        <p>
          Fraco: Pericias Físicas -2 <br /> Vulnerável: Defesa -2
        </p>
      ),
    },
  ];
}
