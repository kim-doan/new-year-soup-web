export enum AuthError {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  WORONG_PASSWORD = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  MANY_REQUESTS = 'auth/too-many-requests',
}
