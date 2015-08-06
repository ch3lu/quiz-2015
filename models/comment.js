// Definicion del modelo de Quiz con validación

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Comment', {
    texto: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: '-> Falta comentario' } }
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    classMethods: {
      countDistinctQuizId: function () {
        return this.aggregate('QuizId', 'count', { distinct: true }).then('success', function(count) { return count; })
      },
      countPublished: function () {
        return this.count({where: {publicado: true}}).then('success', function(count) { return count; })
      }
    }
  });
};
