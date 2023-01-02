export interface Device {
  map(arg0: (value: any) => JSX.Element): React.ReactNode;
  key?: number | string | any;
  children?: React.ReactNode | any;
  modelo: string | any;
  serie: string | any;
  id: number | any;
}
