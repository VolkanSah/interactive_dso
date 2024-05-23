// attack_waves.js
function addAttackWave(lagerId, generalName, unitType, units) {
    const wave = {
        lagerId: lagerId,
        general: generalName,
        unitType: unitType,
        units: units
    };
    return wave;
}
