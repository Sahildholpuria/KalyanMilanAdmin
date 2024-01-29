import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from "@mui/material"
import { useCallback } from "react";

let singleDigit = [
    { label: '', value: '' },
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
];
let jodiDigit = [
    { label: '', value: '' },
    { label: '00', value: '00' },
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
    { label: '32', value: '32' },
    { label: '33', value: '33' },
    { label: '34', value: '34' },
    { label: '35', value: '35' },
    { label: '36', value: '36' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '42' },
    { label: '43', value: '43' },
    { label: '44', value: '44' },
    { label: '45', value: '45' },
    { label: '46', value: '46' },
    { label: '47', value: '47' },
    { label: '48', value: '48' },
    { label: '49', value: '49' },
    { label: '50', value: '50' },
    { label: '51', value: '51' },
    { label: '52', value: '52' },
    { label: '53', value: '53' },
    { label: '54', value: '54' },
    { label: '55', value: '55' },
    { label: '56', value: '56' },
    { label: '57', value: '57' },
    { label: '58', value: '58' },
    { label: '59', value: '59' },
    { label: '60', value: '60' },
    { label: '61', value: '61' },
    { label: '63', value: '63' },
    { label: '64', value: '64' },
    { label: '65', value: '65' },
    { label: '66', value: '66' },
    { label: '67', value: '67' },
    { label: '68', value: '68' },
    { label: '69', value: '69' },
    { label: '70', value: '70' },
    { label: '71', value: '71' },
    { label: '72', value: '72' },
    { label: '73', value: '73' },
    { label: '74', value: '74' },
    { label: '75', value: '75' },
    { label: '76', value: '76' },
    { label: '77', value: '77' },
    { label: '78', value: '78' },
    { label: '79', value: '79' },
    { label: '80', value: '80' },
    { label: '81', value: '81' },
    { label: '82', value: '82' },
    { label: '83', value: '83' },
    { label: '84', value: '84' },
    { label: '85', value: '85' },
    { label: '86', value: '86' },
    { label: '87', value: '87' },
    { label: '88', value: '88' },
    { label: '89', value: '89' },
    { label: '90', value: '90' },
    { label: '91', value: '91' },
    { label: '92', value: '92' },
    { label: '93', value: '93' },
    { label: '94', value: '94' },
    { label: '95', value: '95' },
    { label: '96', value: '96' },
    { label: '97', value: '97' },
    { label: '98', value: '98' },
    { label: '99', value: '99' },
];
let singlePanna = [
    { label: '', value: '' },
    { label: '120', value: '120' },
    { label: '123', value: '123' },
    { label: '124', value: '124' },
    { label: '125', value: '125' },
    { label: '126', value: '126' },
    { label: '127', value: '127' },
    { label: '128', value: '128' },
    { label: '129', value: '129' },
    { label: '130', value: '130' },
    { label: '134', value: '134' },
    { label: '135', value: '135' },
    { label: '136', value: '136' },
    { label: '137', value: '137' },
    { label: '138', value: '138' },
    { label: '139', value: '139' },
    { label: '140', value: '140' },
    { label: '145', value: '145' },
    { label: '146', value: '146' },
    { label: '147', value: '147' },
    { label: '148', value: '148' },
    { label: '149', value: '149' },
    { label: '150', value: '150' },
    { label: '156', value: '156' },
    { label: '157', value: '157' },
    { label: '158', value: '158' },
    { label: '159', value: '159' },
    { label: '160', value: '160' },
    { label: '167', value: '167' },
    { label: '168', value: '168' },
    { label: '169', value: '169' },
    { label: '170', value: '170' },
    { label: '178', value: '178' },
    { label: '179', value: '179' },
    { label: '180', value: '180' },
    { label: '189', value: '189' },
    { label: '190', value: '190' },
    { label: '230', value: '230' },
    { label: '234', value: '234' },
    { label: '235', value: '235' },
    { label: '236', value: '236' },
    { label: '237', value: '237' },
    { label: '238', value: '238' },
    { label: '239', value: '239' },
    { label: '240', value: '240' },
    { label: '245', value: '245' },
    { label: '246', value: '246' },
    { label: '247', value: '247' },
    { label: '248', value: '248' },
    { label: '249', value: '249' },
    { label: '250', value: '250' },
    { label: '256', value: '256' },
    { label: '257', value: '257' },
    { label: '258', value: '258' },
    { label: '259', value: '259' },
    { label: '260', value: '260' },
    { label: '267', value: '267' },
    { label: '268', value: '268' },
    { label: '269', value: '269' },
    { label: '270', value: '270' },
    { label: '278', value: '278' },
    { label: '279', value: '279' },
    { label: '280', value: '280' },
    { label: '289', value: '289' },
    { label: '290', value: '290' },
    { label: '340', value: '340' },
    { label: '345', value: '345' },
    { label: '346', value: '346' },
    { label: '347', value: '347' },
    { label: '348', value: '348' },
    { label: '349', value: '349' },
    { label: '350', value: '350' },
    { label: '356', value: '356' },
    { label: '357', value: '357' },
    { label: '358', value: '358' },
    { label: '359', value: '359' },
    { label: '360', value: '360' },
    { label: '367', value: '367' },
    { label: '368', value: '368' },
    { label: '369', value: '369' },
    { label: '370', value: '370' },
    { label: '378', value: '378' },
    { label: '379', value: '379' },
    { label: '380', value: '380' },
    { label: '389', value: '389' },
    { label: '390', value: '390' },
    { label: '450', value: '450' },
    { label: '456', value: '456' },
    { label: '457', value: '457' },
    { label: '458', value: '458' },
    { label: '459', value: '459' },
    { label: '460', value: '460' },
    { label: '467', value: '467' },
    { label: '468', value: '468' },
    { label: '469', value: '469' },
    { label: '470', value: '470' },
    { label: '478', value: '478' },
    { label: '479', value: '479' },
    { label: '480', value: '480' },
    { label: '489', value: '489' },
    { label: '490', value: '490' },
    { label: '560', value: '560' },
    { label: '567', value: '567' },
    { label: '568', value: '568' },
    { label: '569', value: '569' },
    { label: '570', value: '570' },
    { label: '578', value: '578' },
    { label: '579', value: '579' },
    { label: '580', value: '580' },
    { label: '589', value: '589' },
    { label: '590', value: '590' },
    { label: '670', value: '670' },
    { label: '678', value: '678' },
    { label: '679', value: '679' },
    { label: '680', value: '680' },
    { label: '689', value: '689' },
    { label: '690', value: '690' },
    { label: '780', value: '780' },
    { label: '789', value: '789' },
    { label: '790', value: '790' },
    { label: '890', value: '890' },
];
let doublePanna = [
    { label: '', value: '' },
    { label: '100', value: '100' },
    { label: '110', value: '110' },
    { label: '112', value: '112' },
    { label: '113', value: '113' },
    { label: '114', value: '114' },
    { label: '115', value: '115' },
    { label: '116', value: '116' },
    { label: '117', value: '117' },
    { label: '118', value: '118' },
    { label: '119', value: '119' },
    { label: '122', value: '122' },
    { label: '133', value: '133' },
    { label: '144', value: '144' },
    { label: '155', value: '155' },
    { label: '166', value: '166' },
    { label: '177', value: '177' },
    { label: '188', value: '188' },
    { label: '199', value: '199' },
    { label: '200', value: '200' },
    { label: '220', value: '220' },
    { label: '223', value: '223' },
    { label: '224', value: '224' },
    { label: '225', value: '225' },
    { label: '226', value: '226' },
    { label: '227', value: '227' },
    { label: '228', value: '228' },
    { label: '229', value: '229' },
    { label: '233', value: '233' },
    { label: '244', value: '244' },
    { label: '255', value: '255' },
    { label: '266', value: '266' },
    { label: '277', value: '277' },
    { label: '288', value: '288' },
    { label: '299', value: '299' },
    { label: '300', value: '300' },
    { label: '330', value: '330' },
    { label: '334', value: '334' },
    { label: '335', value: '335' },
    { label: '336', value: '336' },
    { label: '337', value: '337' },
    { label: '338', value: '338' },
    { label: '339', value: '339' },
    { label: '344', value: '344' },
    { label: '355', value: '355' },
    { label: '366', value: '366' },
    { label: '377', value: '377' },
    { label: '388', value: '388' },
    { label: '399', value: '399' },
    { label: '400', value: '400' },
    { label: '440', value: '440' },
    { label: '445', value: '445' },
    { label: '446', value: '446' },
    { label: '447', value: '447' },
    { label: '448', value: '448' },
    { label: '449', value: '449' },
    { label: '455', value: '455' },
    { label: '466', value: '466' },
    { label: '477', value: '477' },
    { label: '488', value: '488' },
    { label: '499', value: '499' },
    { label: '500', value: '500' },
    { label: '550', value: '550' },
    { label: '556', value: '556' },
    { label: '557', value: '557' },
    { label: '558', value: '558' },
    { label: '559', value: '559' },
    { label: '566', value: '566' },
    { label: '577', value: '577' },
    { label: '588', value: '588' },
    { label: '599', value: '599' },
    { label: '600', value: '600' },
    { label: '660', value: '660' },
    { label: '667', value: '667' },
    { label: '668', value: '668' },
    { label: '669', value: '669' },
    { label: '677', value: '677' },
    { label: '688', value: '688' },
    { label: '699', value: '699' },
    { label: '700', value: '700' },
    { label: '770', value: '770' },
    { label: '778', value: '778' },
    { label: '779', value: '779' },
    { label: '788', value: '788' },
    { label: '799', value: '799' },
    { label: '800', value: '800' },
    { label: '880', value: '880' },
    { label: '889', value: '889' },
    { label: '899', value: '899' },
    { label: '900', value: '900' },
    { label: '990', value: '990' },
];
let triplePanna = [
    { label: '', value: '' },
    { label: '000', value: '000' },
    { label: '111', value: '111' },
    { label: '222', value: '222' },
    { label: '333', value: '333' },
    { label: '444', value: '444' },
    { label: '555', value: '555' },
    { label: '666', value: '666' },
    { label: '777', value: '777' },
    { label: '888', value: '888' },
    { label: '999', value: '999' },
];
let halfSangam = [
    { label: '', value: '' },
    { label: '000', value: '000' },
    { label: '100', value: '100' },
    { label: '111', value: '111' },
    { label: '112', value: '112' },
    { label: '113', value: '113' },
    { label: '114', value: '114' },
    { label: '115', value: '115' },
    { label: '116', value: '116' },
    { label: '117', value: '117' },
    { label: '118', value: '118' },
    { label: '119', value: '119' },
    { label: '120', value: '120' },
    { label: '122', value: '122' },
    { label: '123', value: '123' },
    { label: '124', value: '124' },
    { label: '125', value: '125' },
    { label: '126', value: '126' },
    { label: '127', value: '127' },
    { label: '128', value: '128' },
    { label: '129', value: '129' },
    { label: '130', value: '130' },
    { label: '133', value: '133' },
    { label: '134', value: '134' },
    { label: '135', value: '135' },
    { label: '136', value: '136' },
    { label: '137', value: '137' },
    { label: '138', value: '138' },
    { label: '139', value: '139' },
    { label: '140', value: '140' },
    { label: '144', value: '144' },
    { label: '145', value: '145' },
    { label: '146', value: '146' },
    { label: '147', value: '147' },
    { label: '148', value: '148' },
    { label: '149', value: '149' },
    { label: '150', value: '150' },
    { label: '155', value: '155' },
    { label: '156', value: '156' },
    { label: '157', value: '157' },
    { label: '158', value: '158' },
    { label: '159', value: '159' },
    { label: '160', value: '160' },
    { label: '166', value: '166' },
    { label: '167', value: '167' },
    { label: '168', value: '168' },
    { label: '169', value: '169' },
    { label: '170', value: '170' },
    { label: '177', value: '177' },
    { label: '178', value: '178' },
    { label: '179', value: '179' },
    { label: '180', value: '180' },
    { label: '188', value: '188' },
    { label: '189', value: '189' },
    { label: '190', value: '190' },
    { label: '199', value: '199' },
    { label: '200', value: '200' },
    { label: '220', value: '220' },
    { label: '222', value: '222' },
    { label: '223', value: '223' },
    { label: '224', value: '224' },
    { label: '225', value: '225' },
    { label: '226', value: '226' },
    { label: '227', value: '227' },
    { label: '228', value: '228' },
    { label: '229', value: '229' },
    { label: '230', value: '230' },
    { label: '233', value: '233' },
    { label: '234', value: '234' },
    { label: '235', value: '235' },
    { label: '236', value: '236' },
    { label: '237', value: '237' },
    { label: '238', value: '238' },
    { label: '239', value: '239' },
    { label: '240', value: '240' },
    { label: '244', value: '244' },
    { label: '245', value: '245' },
    { label: '246', value: '246' },
    { label: '247', value: '247' },
    { label: '248', value: '248' },
    { label: '249', value: '249' },
    { label: '250', value: '250' },
    { label: '255', value: '255' },
    { label: '256', value: '256' },
    { label: '257', value: '257' },
    { label: '258', value: '258' },
    { label: '259', value: '259' },
    { label: '260', value: '260' },
    { label: '266', value: '266' },
    { label: '267', value: '267' },
    { label: '268', value: '268' },
    { label: '269', value: '269' },
    { label: '270', value: '270' },
    { label: '277', value: '277' },
    { label: '278', value: '278' },
    { label: '279', value: '279' },
    { label: '280', value: '280' },
    { label: '288', value: '288' },
    { label: '289', value: '289' },
    { label: '290', value: '290' },
    { label: '291', value: '291' },
    { label: '292', value: '292' },
    { label: '293', value: '293' },
    { label: '294', value: '294' },
    { label: '295', value: '295' },
    { label: '296', value: '296' },
    { label: '297', value: '297' },
    { label: '298', value: '298' },
    { label: '299', value: '299' },
    { label: '300', value: '300' },
    { label: '329', value: '329' },
    { label: '330', value: '330' },
    { label: '333', value: '333' },
    { label: '334', value: '334' },
    { label: '335', value: '335' },
    { label: '336', value: '336' },
    { label: '337', value: '337' },
    { label: '338', value: '338' },
    { label: '339', value: '339' },
    { label: '340', value: '340' },
    { label: '344', value: '344' },
    { label: '345', value: '345' },
    { label: '346', value: '346' },
    { label: '347', value: '347' },
    { label: '348', value: '348' },
    { label: '349', value: '349' },
    { label: '350', value: '350' },
    { label: '355', value: '355' },
    { label: '356', value: '356' },
    { label: '357', value: '357' },
    { label: '358', value: '358' },
    { label: '359', value: '359' },
    { label: '360', value: '360' },
    { label: '366', value: '366' },
    { label: '367', value: '367' },
    { label: '368', value: '368' },
    { label: '369', value: '369' },
    { label: '370', value: '370' },
    { label: '377', value: '377' },
    { label: '378', value: '378' },
    { label: '379', value: '379' },
    { label: '380', value: '380' },
    { label: '388', value: '388' },
    { label: '389', value: '389' },
    { label: '390', value: '390' },
    { label: '399', value: '399' },
    { label: '400', value: '400' },
    { label: '440', value: '440' },
    { label: '444', value: '444' },
    { label: '445', value: '445' },
    { label: '446', value: '446' },
    { label: '447', value: '447' },
    { label: '448', value: '448' },
    { label: '449', value: '449' },
    { label: '450', value: '450' },
    { label: '455', value: '455' },
    { label: '456', value: '456' },
    { label: '457', value: '457' },
    { label: '458', value: '458' },
    { label: '459', value: '459' },
    { label: '460', value: '460' },
    { label: '466', value: '466' },
    { label: '467', value: '467' },
    { label: '468', value: '468' },
    { label: '469', value: '469' },
    { label: '470', value: '470' },
    { label: '477', value: '477' },
    { label: '478', value: '478' },
    { label: '479', value: '479' },
    { label: '480', value: '480' },
    { label: '488', value: '488' },
    { label: '489', value: '489' },
    { label: '490', value: '490' },
    { label: '499', value: '499' },
    { label: '500', value: '500' },
    { label: '555', value: '555' },
    { label: '556', value: '556' },
    { label: '557', value: '557' },
    { label: '558', value: '558' },
    { label: '559', value: '559' },
    { label: '560', value: '560' },
    { label: '566', value: '566' },
    { label: '567', value: '567' },
    { label: '568', value: '568' },
    { label: '569', value: '569' },
    { label: '570', value: '570' },
    { label: '577', value: '577' },
    { label: '578', value: '578' },
    { label: '579', value: '579' },
    { label: '580', value: '580' },
    { label: '588', value: '588' },
    { label: '589', value: '589' },
    { label: '590', value: '590' },
    { label: '591', value: '591' },
    { label: '592', value: '592' },
    { label: '593', value: '593' },
    { label: '594', value: '594' },
    { label: '595', value: '595' },
    { label: '596', value: '596' },
    { label: '597', value: '597' },
    { label: '598', value: '598' },
    { label: '599', value: '599' },
    { label: '600', value: '600' },
    { label: '660', value: '660' },
    { label: '666', value: '666' },
    { label: '667', value: '667' },
    { label: '668', value: '668' },
    { label: '669', value: '669' },
    { label: '670', value: '670' },
    { label: '677', value: '677' },
    { label: '678', value: '678' },
    { label: '679', value: '679' },
    { label: '680', value: '680' },
    { label: '681', value: '681' },
    { label: '682', value: '682' },
    { label: '683', value: '683' },
    { label: '684', value: '684' },
    { label: '685', value: '685' },
    { label: '686', value: '686' },
    { label: '687', value: '687' },
    { label: '688', value: '688' },
    { label: '689', value: '689' },
    { label: '690', value: '690' },
    { label: '699', value: '699' },
    { label: '700', value: '700' },
    { label: '770', value: '770' },
    { label: '777', value: '777' },
    { label: '778', value: '778' },
    { label: '779', value: '779' },
    { label: '780', value: '780' },
    { label: '799', value: '799' },
    { label: '800', value: '800' },
    { label: '880', value: '880' },
    { label: '899', value: '899' },
    { label: '900', value: '900' },
    { label: '990', value: '990' },
    { label: '999', value: '999' },
];
let fullSangam = [
    { label: '', value: '' },
    { label: '000', value: '000' },
    { label: '100', value: '100' },
    { label: '111', value: '111' },
    { label: '112', value: '112' },
    { label: '113', value: '113' },
    { label: '114', value: '114' },
    { label: '115', value: '115' },
    { label: '116', value: '116' },
    { label: '117', value: '117' },
    { label: '118', value: '118' },
    { label: '119', value: '119' },
    { label: '120', value: '120' },
    { label: '122', value: '122' },
    { label: '123', value: '123' },
    { label: '124', value: '124' },
    { label: '125', value: '125' },
    { label: '126', value: '126' },
    { label: '127', value: '127' },
    { label: '128', value: '128' },
    { label: '129', value: '129' },
    { label: '130', value: '130' },
    { label: '133', value: '133' },
    { label: '134', value: '134' },
    { label: '135', value: '135' },
    { label: '136', value: '136' },
    { label: '137', value: '137' },
    { label: '138', value: '138' },
    { label: '139', value: '139' },
    { label: '140', value: '140' },
    { label: '144', value: '144' },
    { label: '145', value: '145' },
    { label: '146', value: '146' },
    { label: '147', value: '147' },
    { label: '148', value: '148' },
    { label: '149', value: '149' },
    { label: '150', value: '150' },
    { label: '155', value: '155' },
    { label: '156', value: '156' },
    { label: '157', value: '157' },
    { label: '158', value: '158' },
    { label: '159', value: '159' },
    { label: '160', value: '160' },
    { label: '166', value: '166' },
    { label: '167', value: '167' },
    { label: '168', value: '168' },
    { label: '169', value: '169' },
    { label: '170', value: '170' },
    { label: '177', value: '177' },
    { label: '178', value: '178' },
    { label: '179', value: '179' },
    { label: '180', value: '180' },
    { label: '188', value: '188' },
    { label: '189', value: '189' },
    { label: '190', value: '190' },
    { label: '199', value: '199' },
    { label: '200', value: '200' },
    { label: '220', value: '220' },
    { label: '222', value: '222' },
    { label: '223', value: '223' },
    { label: '224', value: '224' },
    { label: '225', value: '225' },
    { label: '226', value: '226' },
    { label: '227', value: '227' },
    { label: '228', value: '228' },
    { label: '229', value: '229' },
    { label: '230', value: '230' },
    { label: '233', value: '233' },
    { label: '234', value: '234' },
    { label: '235', value: '235' },
    { label: '236', value: '236' },
    { label: '237', value: '237' },
    { label: '238', value: '238' },
    { label: '239', value: '239' },
    { label: '240', value: '240' },
    { label: '244', value: '244' },
    { label: '245', value: '245' },
    { label: '246', value: '246' },
    { label: '247', value: '247' },
    { label: '248', value: '248' },
    { label: '249', value: '249' },
    { label: '250', value: '250' },
    { label: '255', value: '255' },
    { label: '256', value: '256' },
    { label: '257', value: '257' },
    { label: '258', value: '258' },
    { label: '259', value: '259' },
    { label: '260', value: '260' },
    { label: '266', value: '266' },
    { label: '267', value: '267' },
    { label: '268', value: '268' },
    { label: '269', value: '269' },
    { label: '270', value: '270' },
    { label: '277', value: '277' },
    { label: '278', value: '278' },
    { label: '279', value: '279' },
    { label: '280', value: '280' },
    { label: '288', value: '288' },
    { label: '289', value: '289' },
    { label: '290', value: '290' },
    { label: '291', value: '291' },
    { label: '292', value: '292' },
    { label: '293', value: '293' },
    { label: '294', value: '294' },
    { label: '295', value: '295' },
    { label: '296', value: '296' },
    { label: '297', value: '297' },
    { label: '298', value: '298' },
    { label: '299', value: '299' },
    { label: '300', value: '300' },
    { label: '329', value: '329' },
    { label: '330', value: '330' },
    { label: '333', value: '333' },
    { label: '334', value: '334' },
    { label: '335', value: '335' },
    { label: '336', value: '336' },
    { label: '337', value: '337' },
    { label: '338', value: '338' },
    { label: '339', value: '339' },
    { label: '340', value: '340' },
    { label: '344', value: '344' },
    { label: '345', value: '345' },
    { label: '346', value: '346' },
    { label: '347', value: '347' },
    { label: '348', value: '348' },
    { label: '349', value: '349' },
    { label: '350', value: '350' },
    { label: '355', value: '355' },
    { label: '356', value: '356' },
    { label: '357', value: '357' },
    { label: '358', value: '358' },
    { label: '359', value: '359' },
    { label: '360', value: '360' },
    { label: '366', value: '366' },
    { label: '367', value: '367' },
    { label: '368', value: '368' },
    { label: '369', value: '369' },
    { label: '370', value: '370' },
    { label: '377', value: '377' },
    { label: '378', value: '378' },
    { label: '379', value: '379' },
    { label: '380', value: '380' },
    { label: '388', value: '388' },
    { label: '389', value: '389' },
    { label: '390', value: '390' },
    { label: '399', value: '399' },
    { label: '400', value: '400' },
    { label: '440', value: '440' },
    { label: '444', value: '444' },
    { label: '445', value: '445' },
    { label: '446', value: '446' },
    { label: '447', value: '447' },
    { label: '448', value: '448' },
    { label: '449', value: '449' },
    { label: '450', value: '450' },
    { label: '455', value: '455' },
    { label: '456', value: '456' },
    { label: '457', value: '457' },
    { label: '458', value: '458' },
    { label: '459', value: '459' },
    { label: '460', value: '460' },
    { label: '466', value: '466' },
    { label: '467', value: '467' },
    { label: '468', value: '468' },
    { label: '469', value: '469' },
    { label: '470', value: '470' },
    { label: '477', value: '477' },
    { label: '478', value: '478' },
    { label: '479', value: '479' },
    { label: '480', value: '480' },
    { label: '488', value: '488' },
    { label: '489', value: '489' },
    { label: '490', value: '490' },
    { label: '499', value: '499' },
    { label: '500', value: '500' },
    { label: '555', value: '555' },
    { label: '556', value: '556' },
    { label: '557', value: '557' },
    { label: '558', value: '558' },
    { label: '559', value: '559' },
    { label: '560', value: '560' },
    { label: '566', value: '566' },
    { label: '567', value: '567' },
    { label: '568', value: '568' },
    { label: '569', value: '569' },
    { label: '570', value: '570' },
    { label: '577', value: '577' },
    { label: '578', value: '578' },
    { label: '579', value: '579' },
    { label: '580', value: '580' },
    { label: '588', value: '588' },
    { label: '589', value: '589' },
    { label: '590', value: '590' },
    { label: '591', value: '591' },
    { label: '592', value: '592' },
    { label: '593', value: '593' },
    { label: '594', value: '594' },
    { label: '595', value: '595' },
    { label: '596', value: '596' },
    { label: '597', value: '597' },
    { label: '598', value: '598' },
    { label: '599', value: '599' },
    { label: '600', value: '600' },
    { label: '660', value: '660' },
    { label: '666', value: '666' },
    { label: '667', value: '667' },
    { label: '668', value: '668' },
    { label: '669', value: '669' },
    { label: '670', value: '670' },
    { label: '677', value: '677' },
    { label: '678', value: '678' },
    { label: '679', value: '679' },
    { label: '680', value: '680' },
    { label: '681', value: '681' },
    { label: '682', value: '682' },
    { label: '683', value: '683' },
    { label: '684', value: '684' },
    { label: '685', value: '685' },
    { label: '686', value: '686' },
    { label: '687', value: '687' },
    { label: '688', value: '688' },
    { label: '689', value: '689' },
    { label: '690', value: '690' },
    { label: '699', value: '699' },
    { label: '700', value: '700' },
    { label: '770', value: '770' },
    { label: '777', value: '777' },
    { label: '778', value: '778' },
    { label: '779', value: '779' },
    { label: '780', value: '780' },
    { label: '799', value: '799' },
    { label: '800', value: '800' },
    { label: '880', value: '880' },
    { label: '899', value: '899' },
    { label: '900', value: '900' },
    { label: '990', value: '990' },
    { label: '999', value: '999' },
];
export const EditBidDialog = ({ values, setValues, openDialog, handleCloseDialog, handleCommonAction, content, button1, button2, selectedCustomer }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const gameType = selectedCustomer?.game_type === 'Single Digit' || selectedCustomer?.game_type === 'Jodi Digit' || selectedCustomer?.game_type === 'Single Panna' || selectedCustomer?.game_type === 'Double Panna' || selectedCustomer?.game_type === 'Triple Panna';
    const filedName = values?.open_panna !== 'N/A' ? 'open_panna' : values.open_digit !== 'N/A' ? 'open_digit' : values?.close_panna !== 'N/A' ? 'close_panna' : values?.close_digit !== 'N/A' ? 'close_digit' : '';
    const dropDownValue = values?.open_panna !== 'N/A' ? values?.open_panna : values?.open_digit !== 'N/A' ? values?.open_digit : values?.close_panna !== 'N/A' ? values?.close_panna : values?.close_digit;
    const halfSangamGame = selectedCustomer?.game_type === 'Half Sangam';
    const singleDropDown = selectedCustomer?.game_type === 'Single Digit' ? singleDigit : selectedCustomer?.game_type === 'Jodi Digit' ? jodiDigit : selectedCustomer?.game_type === 'Single Panna' ? singlePanna : selectedCustomer?.game_type === 'Double Panna' ? doublePanna : selectedCustomer?.game_type === 'Triple Panna' ? triplePanna : [{ label: '', value: '' }];
    const doubleDropDown = selectedCustomer?.game_type === 'Half Sangam' ? halfSangam : selectedCustomer?.game_type === 'Full Sangam' ? fullSangam : [{ label: '', value: '' }];
    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ style: { width: isMobile ? '100%' : '25%' } }}>
            <DialogTitle>Update Bid</DialogTitle>
            <DialogContent sx={{ paddingBottom: '10px' }}>
                {gameType ? <Grid
                    xs={12}
                    md={12}
                    sx={{ padding: '5px' }}
                >
                    <TextField
                        fullWidth
                        label="Select Digit"
                        name={filedName}
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={dropDownValue}
                    >
                        {singleDropDown.map((option, index) => (
                            <option
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid> : halfSangamGame && selectedCustomer?.session === 'Open' ? (
                    <>
                        <Grid
                            xs={12}
                            md={12}
                            sx={{ padding: '5px' }}
                        >
                            <TextField
                                fullWidth
                                label="Select Open Digit"
                                name="open_digit"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.open_digit}
                            >
                                {singleDigit.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            xs={12}
                            md={12}
                            sx={{ padding: '5px' }}
                        >
                            <TextField
                                fullWidth
                                label="Select Close Panna"
                                name="close_panna"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.close_panna}
                            >
                                {doubleDropDown.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid> </>) : halfSangamGame && selectedCustomer?.session === 'Close' ? (
                            <>
                                <Grid
                                    xs={12}
                                    md={12}
                                    sx={{ padding: '5px' }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Close Digit"
                                        name="close_digit"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.close_digit}
                                    >
                                        {singleDigit.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                    sx={{ padding: '5px' }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Open Panna"
                                        name="open_panna"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.open_panna}
                                    >
                                        {doubleDropDown.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                            </>
                        ) : (
                    <>
                        <Grid
                            xs={12}
                            md={12}
                            sx={{ padding: '5px' }}
                        >
                            <TextField
                                fullWidth
                                label="Select Open Panna"
                                name="open_panna"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.open_panna}
                            >
                                {doubleDropDown.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            xs={12}
                            md={12}
                            sx={{ padding: '5px' }}
                        >
                            <TextField
                                fullWidth
                                label="Select Close Panna"
                                name="close_panna"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.close_panna}
                            >
                                {doubleDropDown.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCommonAction(selectedCustomer)}>{button1}</Button>
                <Button onClick={() => handleCloseDialog()}>{button2}</Button>
            </DialogActions>
        </Dialog>
    )
}