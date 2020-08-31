const assert = require('assert');

const SettingsBill = require('../settings-bill');

describe('settings-bill', function(){

     const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.recordAction('Call');
        assert.equal(1, settingsBill.actionsFor('Call').length);
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())


    });

    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('Call');
        settingsBill.recordAction('SMS');

        assert.equal(2.35, settingsBill.totals().smsTotals);
        assert.equal(3.35, settingsBill.totals().callTotals);
        assert.equal(5.70, settingsBill.totals().grandTotals);

    });

    it('should calculate the right totals for multiple actions', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('Call');
        settingsBill.recordAction('Call');
        settingsBill.recordAction('SMS');
        settingsBill.recordAction('SMS');

        assert.equal(4.70, settingsBill.totals().smsTotals);
        assert.equal(6.70, settingsBill.totals().callTotals);
        assert.equal(11.40, settingsBill.totals().grandTotals);

    });

    it('should know when warning level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('Call');
        settingsBill.recordAction('SMS');

        assert.equal('warning', settingsBill.forColor());
        
    });

    it('should know when critical level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('Call');
        settingsBill.recordAction('Call');
        settingsBill.recordAction('SMS');
       
        assert.equal('danger', settingsBill.forColor());

    });
});