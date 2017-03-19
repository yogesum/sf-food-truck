function whenScrolled() {
  return function link(scope, elm, attr) {
    const raw = elm[0];
    elm.bind('scroll', () => (
      (raw.scrollTop + raw.offsetHeight) >=
        raw.scrollHeight) && scope.$apply(attr.whenScrolled));
  };
}

export default whenScrolled;
