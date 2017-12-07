var ClozeCard = function (fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;

    if (this.fullText.includes(this.cloze)) {
        this.partial = this.fullText.replace(this.cloze, ' ... ');
    } else {
        !this.partial;
    }
}

module.exports = ClozeCard;