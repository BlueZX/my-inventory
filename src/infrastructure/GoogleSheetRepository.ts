import axios from "axios";
import { SheetRepository } from "@/domain/repositories/SheetRepository";
import { SheetRow } from "@/domain/entities/SheetRow";

export class GoogleSheetRepository implements SheetRepository {
  private csvUrl: string;
  constructor(csvUrl: string) {
    this.csvUrl = csvUrl;
  }

  async fetchRows(): Promise<SheetRow[]> {
    const response = await axios.get(this.csvUrl);
    return this.parseCSV(response.data);
  }

  private parseCSV(csvText: string): SheetRow[] {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(",");
    const data: SheetRow[] = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(",");
      if (rowData.length !== headers.length) continue;
      const rowObject: SheetRow = {
        Producto: rowData[headers.indexOf("Producto")] ?? "",
        Item: rowData[headers.indexOf("Item")] ?? "",
        Cantidad: rowData[headers.indexOf("Cantidad")] ?? "",
      };
      data.push(rowObject);
    }
    return data;
  }
}
