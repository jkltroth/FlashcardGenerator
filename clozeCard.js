var ClozeCard = function (fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;

    this.removeCloze = function () {
        if (this.fullText.includes(this.cloze)) {
            return (this.fullText.replace(this.cloze, ' ... '));
        } else {
            return ('"' + this.cloze + '" doesn\'t appear in "' + this.fullText + '"');
        }
    }

    this.partial = this.removeCloze();
}

module.exports = ClozeCard;