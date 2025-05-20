import { SheetRepository } from "@/domain/repositories/SheetRepository";
import { SheetRow } from "@/domain/entities/SheetRow";

export class FetchSheetRows {
  constructor(private repo: SheetRepository) {}

  async execute(): Promise<SheetRow[]> {
    return await this.repo.fetchRows();
  }
}
