import { communicates } from 'utils/communicates';

export class ErrorMessage extends Error {
  public humanMessage = ''
  public hard = false;
  public code: number | null;
  constructor (message: string, details?: { code?: number, hard?: boolean }) {
    super(message);
    this.hard = details?.hard ?? false;
    this.code = details?.code ?? null;
  }

  showMessage (humanMessage = this.message) {
    this.humanMessage = humanMessage;
    communicates.showError(humanMessage);
  }

  showMessageTemporary (humanMessage = this.message) {
    this.humanMessage = humanMessage;
    if (this.hard) communicates.showError(humanMessage);
    else communicates.showErrorTemporary(humanMessage);
  }
}
