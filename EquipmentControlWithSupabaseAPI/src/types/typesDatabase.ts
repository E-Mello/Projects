interface Equipamento {
  id: number /* primary key */;
  modelo?: any; // type unknown;
  serie?: any; // type unknown;
  vinc_id_prestador?: number;
  user_last_update?: any; // type unknown;
  active: boolean;
}
