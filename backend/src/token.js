class Token {
  constructor(size, userID, lifeSpan) {
    this.size = size;
    this.userID = userID;
    this.value = Token.generate(size);
    this.expirationTime = Date.now() + lifeSpan * 1000;
  }

  static generate(size) {
    let token_string = '';

    for (let i = 0; i < size; i++) {
      token_string += String.fromCharCode(Math.random() * (126 - 48) + 48);
    }

    return token_string;
  }

  isExpired() {
    return this.expirationTime < Date.now();
  }
}

module.exports = Token;
