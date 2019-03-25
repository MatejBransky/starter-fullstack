'use strict';
module.exports = (sequelize, DataTypes) => {
  const Context = sequelize.define(
    'Context',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Context.associate = function(models) {
    // associations can be defined here
    Context.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
    Context.hasMany(models.Task, {
      foreignKey: 'ContextId',
      onDelete: 'CASCADE',
    });
  };
  return Context;
};
