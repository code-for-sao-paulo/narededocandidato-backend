import Sequelize from 'sequelize';

export default function (sequelize) {
  return sequelize.define('Image', {
    content: {
      type: Sequelize.BLOB,
      allowNull: false,
      length: 'long'
    },
    mediaType: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}
