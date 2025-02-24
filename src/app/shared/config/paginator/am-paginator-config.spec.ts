import { CustomMatPaginatorIntl } from './am-paginator-config';

describe('CustomMatPaginatorIntl', () => {
  let paginatorIntl: CustomMatPaginatorIntl;

  beforeEach(() => {
    paginatorIntl = new CustomMatPaginatorIntl();
  });

  it('should create an instance', () => {
    expect(paginatorIntl).toBeTruthy();
  });

  it('should have custom labels', () => {
    expect(paginatorIntl.itemsPerPageLabel).toBe('Itens por página');
    expect(paginatorIntl.nextPageLabel).toBe('Próxima página');
    expect(paginatorIntl.previousPageLabel).toBe('Página anterior');
    expect(paginatorIntl.firstPageLabel).toBe('Primeira página');
    expect(paginatorIntl.lastPageLabel).toBe('Última página');
  });

  describe('getRangeLabel', () => {
    it('should return "0 de 0" for empty list', () => {
      const result = paginatorIntl.getRangeLabel(0, 10, 0);
      expect(result).toBe('0 de 0');
    });

    it('should return "1 - 5 de 10" for first page with 5 items', () => {
      const result = paginatorIntl.getRangeLabel(0, 5, 10);
      expect(result).toBe('1 - 5 de 10');
    });

    it('should return "6 - 10 de 10" for second page with 5 items', () => {
      const result = paginatorIntl.getRangeLabel(1, 5, 10);
      expect(result).toBe('6 - 10 de 10');
    });

    it('should return "11 - 12 de 12" for last page with 2 items', () => {
      const result = paginatorIntl.getRangeLabel(2, 5, 12);
      expect(result).toBe('11 - 12 de 12');
    });

    it('should return "1 - 10 de 10" for first page with 10 items', () => {
      const result = paginatorIntl.getRangeLabel(0, 10, 10);
      expect(result).toBe('1 - 10 de 10');
    });

    it('should return "1 - 15 de 15" for first page with 15 items', () => {
      const result = paginatorIntl.getRangeLabel(0, 15, 15);
      expect(result).toBe('1 - 15 de 15');
    });

    it('should return "16 - 20 de 25" for second page with 20 items', () => {
      const result = paginatorIntl.getRangeLabel(1, 20, 25);
      expect(result).toBe('21 - 25 de 25');
    });
  });
});