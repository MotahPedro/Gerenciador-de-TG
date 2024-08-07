
import { StringUtils } from '../utils/StringUtils';
import { BaseError } from './BaseError';

export interface AppErrorProps {
  message: string;
  status: string;
  err: any;
  customError?: string;
}
export default class AppError extends BaseError {
  constructor(message: string, status: string, reason?: string, err: any = {}) {
    super(message);
    if (!StringUtils.hasLength(message))
      message = 'Oops, algo deu errado! Tente novamente mais tarde.';

    this.status = status || "500";
    this.message = message;
    this.reason = reason;

    if (StringUtils.isEmpty(this.message) && err) {
      this.message = this.buildErrors(err);
      // this.printError(err);
    } else {
      // this.errors = [customError || ''];
      this.printMessages();
    }
  }

  printMessages() {
    console.log('\n');
    console.log('------------------------ERRO------------------------');
    console.log(`status: ${this.status}`);
    console.log(`message: ${this.message}`);
    console.log('------------------------ERRO------------------------');
    console.log('\n');
  }
}
