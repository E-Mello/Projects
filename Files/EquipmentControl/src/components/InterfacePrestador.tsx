//Interface do prestador, rediz as propriedades dos campos relacionados ao prestador
export interface Prestador {
  map(arg0: (value: any) => JSX.Element): React.ReactNode; // Não entendi porque defini a propriedade map, porém, estava dando erro ao fazer o map para mostrar em tela os prestadores, dessa forma, o vscode orientou a fazer isso para resolver o problema (e resolveu)
  name: string; // Definido a propriedade name do meu prestador
  cpf: string; //Definido a propriedade cpf do meu prestador
}
