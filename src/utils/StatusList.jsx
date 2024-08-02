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
      message: <p>Defesa e Reflexos -5</p>,
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
      value: 'Envenenado',
      message: <p>Varia de acordo com o veneno</p>,
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
    {
      value: 'Fraco',
      message: <p>Pericias Físicas -2</p>,
    },
    {
      value: 'Frustrado',
      message: <p>Pericias Mentais -2</p>,
    },
    {
      value: 'Imóvel',
      message: <p>Descolamento = 0</p>,
    },
    {
      value: 'Inconsciente',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Defesa -10 <br /> Falha em Reflexos <br />
          Não pode fazer ações nem reações
        </p>
      ),
    },
    {
      value: 'Indefeso',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Defesa -10 <br /> Falha em Reflexos
        </p>
      ),
    },
    {
      value: 'Lento',
      message: <p>Deslocamento pela metade</p>,
    },
    {
      value: 'Ofuscado',
      message: <p>Ataque e Percepção -2</p>,
    },
    {
      value: 'Paralisado',
      message: (
        <p>
          Imóvel: Descolamento = 0 <br /> Desprevenido: Defesa e Reflexos -5
          <br /> Defesa -10 <br /> Só pode fazer ações mentais
        </p>
      ),
    },
    {
      value: 'Petrificado',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Defesa -10 <br /> Falha em Reflexos <br />
          Não pode fazer ações nem reações <br /> Redução de dano 8
        </p>
      ),
    },
    {
      value: 'Sangrando',
      message: <p>Teste de Con (CD 15) 1d6</p>,
    },
    {
      value: 'Sobrecarregado',
      message: (
        <p>
          Penalidade de Armadura +5 <br /> Deslocamento -3
        </p>
      ),
    },
    {
      value: 'Surdo',
      message: (
        <p>
          Percepção para ouvir = 0 <br /> Iniciativa -5
        </p>
      ),
    },
    {
      value: 'Surpreendido',
      message: (
        <p>
          Desprevenido: Defesa e Reflexos -5 <br /> Não pode fazer ações
        </p>
      ),
    },
    {
      value: 'Vulnerável',
      message: <p>Defesa -2</p>,
    },
  ];
}
