export const treasureNearby = async (context) => {
  const { latitude, longitude, distance, price_value } = context.params.query
  const query = context.service.createQuery()

  query
    .select('treasures.*', 'money_values.*')
    .leftJoin('money_values', function () {
      this.on('treasures.id', '=', 'money_values.treasure_id')
    })
    .where(function () {
      this.whereRaw(
        `6371 * acos(cos(radians(${latitude})) * cos(radians(treasures.latitude)) * cos(radians(treasures.longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(treasures.latitude))) <= ${distance}`
      )
    })
    .where('money_values.amount', '>=', price_value)
    .orderBy('money_values.amount', 'desc')

  context.params.knex = query
}
