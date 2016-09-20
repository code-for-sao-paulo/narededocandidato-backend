import r from 'ressendr';
import Speck from 'speck-entity';

export default function handlers() {
  r.addCustomHandler(
    v => v instanceof Speck || v instanceof Speck.SpeckCollection,
    (v, res) => {
      res.setHeader('content-type', 'text/javascript');
      return v.fetch();
    });
}
