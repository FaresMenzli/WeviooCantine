export function activeEnv() {
    let activeUrl = window.location.href;
    switch (true) {
      case activeUrl.indexOf('localhost') > -1:
        return 'NONE-CI';
      case activeUrl.indexOf(':3002') > -1:
        return 'E2E';
      case activeUrl.indexOf(':3001') > -1:
        return 'TEST';
      default:
        return '';
    }
  }
  