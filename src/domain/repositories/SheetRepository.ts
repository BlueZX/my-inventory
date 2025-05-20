import { SheetRow } from "../entities/SheetRow";

export interface SheetRepository {
  fetchRows(): Promise<SheetRow[]>;
}
