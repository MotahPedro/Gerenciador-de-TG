export class StringUtils {
  static hasLength(str: string | undefined): boolean {
    return str && str.length > 0 ? true : false;
  }

  static isEmpty(element: string): boolean {
    const elementString = JSON.stringify(element);
    if (elementString === '{}' || elementString === '') {
      return true;
    }
    return false;
  }

  static parseMoneyCurrenyBRL(value: string): string {
    if (!value) return '';
    return parseFloat(String(value)).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  /**
   * @param VALOR - valor do cpf sem pontos por exemplo: 08364523477
   * este método irá retornar o cpf com as devidas pontuações: 083.645.234-77
   */
  static mascaraCpf(valor: string): string {
    if (!this.hasLength(valor)) return '';
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  /**
   * @param VALOR - valor do cnpj sem pontos por exemplo: 46338551000160
   * este método irá retornar o cnpj com as devidas pontuações: 46.338.551/0001-60
   */
  static mascaraCnpj(valor: string): string {
    if (!this.hasLength(valor)) return '';
    return valor.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5',
    );
  }

  static onlyNumbers(value: string): string {
    if (typeof value !== 'string') return '';
    return String(value).replace(/\D/g, '');
  }

  static hideCpfCharacters(value: string): string {
    const hiddenCpfFormat = '***.$2.$3-**';
    const valueNumbers = this.onlyNumbers(value);
    return valueNumbers.replace(
      /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
      hiddenCpfFormat,
    );
  }
}
