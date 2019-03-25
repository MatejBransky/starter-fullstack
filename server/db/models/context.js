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
  Context.associate = function(/*models*/) {
    // associations can be defined here
  };
  return Context;
};
