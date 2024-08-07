import { SummaryError } from './SummaryError';

export abstract class BaseError extends Error {
  public code: number;
  public reason: string;
  public message: string;
  public status: string;
  // public referenceError: string;

  constructor(defaultMessage?: string) {
    super(defaultMessage);
    this.message = defaultMessage || '';
  }

  getStatus(err) {
    if (err?.status) {
      return err.status;
    } else if (err?.response?.status) {
      return err.response.status;
    } else return 500;
  }

  buildErrors(err: any): string {
    const messages: string[] = [];
    if (err?.response?.data?.erros) {
      return this.parseErrors(err?.response?.data?.erros);
    }

    if (err?.response?.data?.error_description) {
      messages.push(err?.response?.data?.error_description);
      return messages.join(`\n`);
    }

    if (err?.response?.data?.message) {
      messages.push(err?.response?.data?.message);
      return messages.join(`\n`);
    }

    if (err?.response?.data?.Message) {
      messages.push(err?.response?.data?.Message);
      return messages.join(`\n`);
    }

    if (err.message) {
      return err.message
    }
    return '';
  }

  parseErrors(erros: any[]): string {
    try {
      const errorList = erros.map((element) => element.mensagem);
      if(errorList && errorList.length > 0)
        return errorList.join(`\n`)
    } catch (err) {
      return erros.toString();
    }
  }
  printError(err: any) {
    const summary = new SummaryError(err);
    console.log('\n');
    console.log('------------------------ERRO------------------------');
    summary.print();
    console.log('------------------------ERRO------------------------');
    console.log('\n');
  }
}
