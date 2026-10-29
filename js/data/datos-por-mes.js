"use strict";


window.DATOS_POR_MES = {
  "2026-06": {
    departamentos: {
      doctor_manuel_belgrano: { deudoresUnicos: 121082, deudoresMora: 26764, montoTotal: 468279472000, montoMora: 66704250000 },
      san_pedro:               { deudoresUnicos: 35400, deudoresMora: 10664, montoTotal: 119737374000, montoMora: 22084634000 },
      palpala:                 { deudoresUnicos: 30098, deudoresMora: 7292, montoTotal: 99931066000, montoMora: 16438082000 },
      el_carmen:               { deudoresUnicos: 35023, deudoresMora: 7878, montoTotal: 142579544000, montoMora: 19474073000 },
      ledesma:                 { deudoresUnicos: 29240, deudoresMora: 8201, montoTotal: 108240876000, montoMora: 19404147000 },
      san_antonio:             { deudoresUnicos: 2556,  deudoresMora: 574,  montoTotal: 8683740000,  montoMora: 1563277000 },
      santa_barbara:           { deudoresUnicos: 8327,  deudoresMora: 2521, montoTotal: 25756318000,  montoMora: 4807790000 },
      tilcara:                 { deudoresUnicos: 4899,  deudoresMora: 830,  montoTotal: 17090346000,  montoMora: 1776105000 },
      tumbaya:                 { deudoresUnicos: 1125,  deudoresMora: 217,  montoTotal: 3739056000,  montoMora: 502147000 },
      humahuaca:                { deudoresUnicos: 5248,  deudoresMora: 941,  montoTotal: 18042359000,  montoMora: 1889346000 },
      cochinoca:                { deudoresUnicos: 5075,  deudoresMora: 779,  montoTotal: 24195742000,  montoMora: 3219474000 },
      valle_grande:             { deudoresUnicos: 787,  deudoresMora: 159,  montoTotal: 2355843000,  montoMora: 294418000 },
      yavi:                     { deudoresUnicos: 4688,  deudoresMora: 647,  montoTotal: 19631343000,  montoMora: 2614690000 },
      santa_catalina:           { deudoresUnicos: 167,   deudoresMora: 21,  montoTotal: 506888000,  montoMora: 23136000 },
      rinconada:                { deudoresUnicos: 142,   deudoresMora: 18,  montoTotal: 923770000,   montoMora: 66518000 },
      susques:                  { deudoresUnicos: 534,  deudoresMora: 92,  montoTotal: 3610213000,  montoMora: 565383000 }
    },
    
    provincia: {
      deudoresUnicos: 285794,
      deudoresMora:   67874,
      montoTotal:     1067769051000,
      montoMora:      161962468000
    },
    
    entidadesTipo: {
      bancos:       { nombre: "Bancos",                                   deudoresTotal: 187654, deudoresMora: 19307, montoTotal: 750823929, montoMora: 82400019 },
      financieras:  { nombre: "Compañías financieras",                    deudoresTotal: 45565,  deudoresMora: 6009,  montoTotal: 70407534,  montoMora: 6738509 },
      pnfcOtro:     { nombre: "PNFC - otro",                              deudoresTotal: 52037,  deudoresMora: 25535, montoTotal: 83230819,  montoMora: 32499932 },
      pnfcTarjetas: { nombre: "PNFC - emisoras no bancarias de tarjetas", deudoresTotal: 156656, deudoresMora: 38994, montoTotal: 163306769, montoMora: 40324008 }
    },
    
    edadSexo: [
      { rango: "Hasta 25", sexo: "F", deudoresTotal: 8780,  deudoresMora: 3066,  montoTotal: 6494072,   montoMora: 2122001,  montoPromTotal: 531.9957,  montoPromMora: 548.179 },
      { rango: "Hasta 25", sexo: "M", deudoresTotal: 9222,  deudoresMora: 3205,  montoTotal: 10685557,  montoMora: 3258500,  montoPromTotal: 790.7028,  montoPromMora: 757.2624 },
      { rango: "25-34",    sexo: "F", deudoresTotal: 30980, deudoresMora: 9032,  montoTotal: 63469783,  montoMora: 14294261, montoPromTotal: 1183.8948, montoPromMora: 1062.6123 },
      { rango: "25-34",    sexo: "M", deudoresTotal: 30586, deudoresMora: 10009, montoTotal: 89353869,  montoMora: 21597261, montoPromTotal: 1597.7446, montoPromMora: 1358.7456 },
      { rango: "35-44",    sexo: "F", deudoresTotal: 32320, deudoresMora: 8100,  montoTotal: 117352148, montoMora: 17959880, montoPromTotal: 1879.0775, montoPromMora: 1368.5804 },
      { rango: "35-44",    sexo: "M", deudoresTotal: 33188, deudoresMora: 9386,  montoTotal: 168875515, montoMora: 31761589, montoPromTotal: 2566.3802, montoPromMora: 2020.5859 },
      { rango: "45-54",    sexo: "F", deudoresTotal: 29304, deudoresMora: 6058,  montoTotal: 124208457, montoMora: 14809445, montoPromTotal: 2097.8678, montoPromMora: 1474.8974 },
      { rango: "45-54",    sexo: "M", deudoresTotal: 28740, deudoresMora: 6605,  montoTotal: 159170108, montoMora: 21103613, montoPromTotal: 2821.0146, montoPromMora: 1928.151 },
      { rango: "55-64",    sexo: "F", deudoresTotal: 21010, deudoresMora: 3543,  montoTotal: 85070167,  montoMora: 9935608,  montoPromTotal: 2053.9915, montoPromMora: 1630.3919 },
      { rango: "55-64",    sexo: "M", deudoresTotal: 17537, deudoresMora: 3024,  montoTotal: 103811194, montoMora: 10384317, montoPromTotal: 3081.2738, montoPromMora: 2078.9423 },
      { rango: "65 o más", sexo: "F", deudoresTotal: 24425, deudoresMora: 3290,  montoTotal: 68676626,  montoMora: 7654262,  montoPromTotal: 1603.2081, montoPromMora: 1401.6228 },
      { rango: "65 o más", sexo: "M", deudoresTotal: 19180, deudoresMora: 2500,  montoTotal: 67071336,  montoMora: 6294518,  montoPromTotal: 2139.8461, montoPromMora: 1581.1399 }
    ],
    
    indicadores: [
      { icono: "joven",  valor: "21%",       label: "de los deudores esta conformado por jovenes (25-34 años)",                         nota: "3 de cada 10 de ellas está en mora",                                                              color: "teal" },
      { icono: "mayor",  valor: "15%",       label: "de los deudores esta conformado por adultos mayores (+65 años)",            nota: "El 13% de ellos se encuentra en mora",                                                              color: "teal" },
      { icono: "monto",  valor: "$ 1.395.210", label: "Monto promedio de deuda entre jóvenes (25-34 años)",                                                                                  color: "azul" },
      { icono: "monto",  valor: "$ 1.829.955", label: "Monto promedio de deuda en adultos mayores (+65 años)",                                                                                                color: "azul" },
      { icono: "banco",  valor: "51%",       label: "de la deuda en mora está en los bancos",                          nota: "El 82% se concentra en los 5 principales: Macro, Galicia, La Nación, Santander y BBVA",            color: "coral" },
      { icono: "tarjeta",valor: "25%",       label: "de la deuda en mora está en PNFC (emisoras no bancarias de tarjetas)", nota: "El 94% se concentra en las 3 principales: Tarjeta Naranja, Tarjeta Sucrédito y Mercado Libre", color: "amarillo" }
    ]
  },
  "2026-07": {
    departamentos: {
      doctor_manuel_belgrano: { deudoresUnicos: 121639, deudoresMora: 26964, montoTotal: 470398520000, montoMora: 67611747000 },
      san_pedro:               { deudoresUnicos: 35264, deudoresMora: 10688, montoTotal: 118926327000, montoMora: 22299564000 },
      palpala:                 { deudoresUnicos: 30238, deudoresMora: 7341,  montoTotal: 100348487000, montoMora: 16647719000 },
      el_carmen:               { deudoresUnicos: 35168, deudoresMora: 7888,  montoTotal: 142776507000, montoMora: 19227097000 },
      ledesma:                 { deudoresUnicos: 29245, deudoresMora: 8197,  montoTotal: 107842778000, montoMora: 19476471000 },
      san_antonio:             { deudoresUnicos: 2554,  deudoresMora: 574,   montoTotal: 8789288000,   montoMora: 1603000000 },
      santa_barbara:           { deudoresUnicos: 8382,  deudoresMora: 2543,  montoTotal: 25781095000,  montoMora: 4875488000 },
      tilcara:                 { deudoresUnicos: 4882,  deudoresMora: 820,   montoTotal: 17078202000,  montoMora: 1741168000 },
      tumbaya:                 { deudoresUnicos: 1130,  deudoresMora: 218,   montoTotal: 3711883000,   montoMora: 507629000 },
      humahuaca:               { deudoresUnicos: 5286,  deudoresMora: 947,   montoTotal: 18183344000,  montoMora: 1883069000 },
      cochinoca:               { deudoresUnicos: 5080,  deudoresMora: 779,   montoTotal: 24342177000,  montoMora: 3309212000 },
      valle_grande:            { deudoresUnicos: 781,   deudoresMora: 159,   montoTotal: 2333271000,   montoMora: 292332000 },
      yavi:                    { deudoresUnicos: 4736,  deudoresMora: 645,   montoTotal: 19577526000,  montoMora: 1871825000 },
      santa_catalina:          { deudoresUnicos: 177,   deudoresMora: 20,    montoTotal: 513344000,    montoMora: 22883000 },
      rinconada:               { deudoresUnicos: 145,   deudoresMora: 18,    montoTotal: 974745000,    montoMora: 65809000 },
      susques:                 { deudoresUnicos: 539,   deudoresMora: 96,    montoTotal: 3525611000,   montoMora: 572719000 }
    },
    
    provincia: {
      deudoresUnicos: 286628,
      deudoresMora:   68176,
      montoTotal:     1069536579000,
      montoMora:      162528608000
    },
    
    entidadesTipo: {
      bancos:       { nombre: "Bancos",                                   deudoresTotal: 187746, deudoresMora: 19112, montoTotal: 752911950, montoMora: 81219410 },
      financieras:  { nombre: "Compañías financieras",                    deudoresTotal: 44941,  deudoresMora: 6077,  montoTotal: 70689665,  montoMora: 7414202 },
      pnfcOtro:     { nombre: "PNFC - otro",                              deudoresTotal: 52701,  deudoresMora: 26154, montoTotal: 84632133,  montoMora: 33244587 },
      pnfcTarjetas: { nombre: "PNFC - emisoras no bancarias de tarjetas", deudoresTotal: 154542, deudoresMora: 38594, montoTotal: 161302831, montoMora: 40650409 }
    },
    
    edadSexo: [
      { rango: "Hasta 25", sexo: "F", deudoresTotal: 8851, deudoresMora: 3036, montoTotal: 6413710, montoMora: 2105291, montoPromTotal: 519.7496, montoPromMora: 550.259 },
      { rango: "Hasta 25", sexo: "M", deudoresTotal: 9293, deudoresMora: 3183, montoTotal: 10385405, montoMora: 3198138, montoPromTotal: 768.3217, montoPromMora: 758.5716 },
      { rango: "25-34", sexo: "F", deudoresTotal: 31335, deudoresMora: 9175, montoTotal: 62567946, montoMora: 14331942, montoPromTotal: 1155.883, montoPromMora: 1055.9156 },
      { rango: "25-34", sexo: "M", deudoresTotal: 30693, deudoresMora: 10092, montoTotal: 88459419, montoMora: 21724416, montoPromTotal: 1587.9408, montoPromMora: 1372.444 },
      { rango: "35-44", sexo: "F", deudoresTotal: 32584, deudoresMora: 8140, montoTotal: 118440323, montoMora: 18231552, montoPromTotal: 1900.1833, montoPromMora: 1389.7059 },
      { rango: "35-44", sexo: "M", deudoresTotal: 33077, deudoresMora: 9417, montoTotal: 166557001, montoMora: 31910120, montoPromTotal: 2565.6125, montoPromMora: 2035.4736 },
      { rango: "45-54", sexo: "F", deudoresTotal: 29464, deudoresMora: 6070, montoTotal: 125708541, montoMora: 14423683, montoPromTotal: 2139.6106, montoPromMora: 1435.638 },
      { rango: "45-54", sexo: "M", deudoresTotal: 28773, deudoresMora: 6674, montoTotal: 159935892, montoMora: 21196049, montoPromTotal: 2866.9025, montoPromMora: 1913.3462 },
      { rango: "55-64", sexo: "F", deudoresTotal: 20958, deudoresMora: 3545, montoTotal: 85706385, montoMora: 9817486, montoPromTotal: 2109.2803, montoPromMora: 1611.5374 },
      { rango: "55-64", sexo: "M", deudoresTotal: 17438, deudoresMora: 3035, montoTotal: 103973950, montoMora: 11180021, montoPromTotal: 3150.153, montoPromMora: 2232.4323 },
      { rango: "65 o más", sexo: "F", deudoresTotal: 24519, deudoresMora: 3276, montoTotal: 69798862, montoMora: 7708010, montoPromTotal: 1649.0777, montoPromMora: 1417.4347 },
      { rango: "65 o más", sexo: "M", deudoresTotal: 19130, deudoresMora: 2476, montoTotal: 68242102, montoMora: 6472298, montoPromTotal: 2217.4525, montoPromMora: 1632.7694 }
    ],
    
    indicadores: [
      { icono: "joven",  valor: "21%",       label: "de los deudores esta conformado por jovenes (25-34 años)",                         nota: "3 de cada 10 de ellas está en mora",                                                              color: "teal" },
      { icono: "mayor",  valor: "15%",       label: "de los deudores esta conformado por adultos mayores (+65 años)",            nota: "El 13% de ellos se encuentra en mora",                                                              color: "teal" },
      { icono: "monto",  valor: "$ 1.395.210", label: "Monto promedio de deuda entre jóvenes (25-34 años)",                                                                                  color: "azul" },
      { icono: "monto",  valor: "$ 1.829.955", label: "Monto promedio de deuda en adultos mayores (+65 años)",                                                                                                color: "azul" },
      { icono: "banco",  valor: "51%",       label: "de la deuda en mora está en los bancos",                          nota: "El 82% se concentra en los 5 principales: Macro, Galicia, La Nación, Santander y BBVA",            color: "coral" },
      { icono: "tarjeta",valor: "25%",       label: "de la deuda en mora está en PNFC (emisoras no bancarias de tarjetas)", nota: "El 94% se concentra en las 3 principales: Tarjeta Naranja, Tarjeta Sucrédito y Mercado Libre", color: "amarillo" }
    ]
  },
  "2026-08": {
    departamentos: {
      doctor_manuel_belgrano: { deudoresUnicos: 123160, deudoresMora: 27211, montoTotal: 484999400000, montoMora: 69207023000 },
      san_pedro:               { deudoresUnicos: 35973, deudoresMora: 10753, montoTotal: 124069210000, montoMora: 22850670000 },
      palpala:                 { deudoresUnicos: 30668, deudoresMora: 7395, montoTotal: 103663017000, montoMora: 16774326000 },
      el_carmen:               { deudoresUnicos: 35886, deudoresMora: 8056, montoTotal: 147150112000, montoMora: 20485312000 },
      ledesma:                 { deudoresUnicos: 29811, deudoresMora: 8389, montoTotal: 111406195000, montoMora: 19803704000 },
      san_antonio:             { deudoresUnicos: 2648,  deudoresMora: 595,  montoTotal: 9039705000,  montoMora: 1482085000 },
      santa_barbara:           { deudoresUnicos: 8524,  deudoresMora: 2589, montoTotal: 27022486000,  montoMora: 5018868000 },
      tilcara:                 { deudoresUnicos: 4982,  deudoresMora: 823,  montoTotal: 17505939000,  montoMora: 1740229000 },
      tumbaya:                 { deudoresUnicos: 1148,  deudoresMora: 222,  montoTotal: 3873288000,  montoMora: 516597000 },
      humahuaca:                { deudoresUnicos: 5401,  deudoresMora: 964,  montoTotal: 18844040000,  montoMora: 1998838000 },
      cochinoca:                { deudoresUnicos: 5239,  deudoresMora: 789,  montoTotal: 25177182000,  montoMora: 3365318000 },
      valle_grande:             { deudoresUnicos: 804,  deudoresMora: 164,  montoTotal: 2477384000,  montoMora: 294085000 },
      yavi:                     { deudoresUnicos: 4847,  deudoresMora: 667,  montoTotal: 19997129000,  montoMora: 1938810000 },
      santa_catalina:           { deudoresUnicos: 172,   deudoresMora: 20,  montoTotal: 546784000,  montoMora: 38789000 },
      rinconada:                { deudoresUnicos: 150,   deudoresMora: 19,  montoTotal: 1080641000,   montoMora: 68992000 },
      susques:                  { deudoresUnicos: 557,  deudoresMora: 96,  montoTotal: 3610424000,  montoMora: 584983000 }
    },
    
    provincia: {
      deudoresUnicos: 291362,
      deudoresMora:   69031,
      montoTotal:     1105160355000,
      montoMora:      166734253000
    },
    
    entidadesTipo: {
      bancos:       { nombre: "Bancos",                                   deudoresTotal: 188887, deudoresMora: 18961, montoTotal: 775364057, montoMora: 81073933 },
      financieras:  { nombre: "Compañías financieras",                    deudoresTotal: 45473,  deudoresMora: 6187,  montoTotal: 72198110,  montoMora: 8125658 },
      pnfcOtro:     { nombre: "PNFC - otro",                              deudoresTotal: 54052,  deudoresMora: 26786, montoTotal: 88393532,  montoMora: 34699157 },
      pnfcTarjetas: { nombre: "PNFC - emisoras no bancarias de tarjetas", deudoresTotal: 159615, deudoresMora: 39012, montoTotal: 169204656, montoMora: 42835505 }
    },
  
    edadSexo: [
      { rango: "Hasta 25", sexo: "F", deudoresTotal: 9193,  deudoresMora: 3013,  montoTotal: 6437891,   montoMora: 2083146,  montoPromTotal: 503.71,  montoPromMora: 550.81 },
      { rango: "Hasta 25", sexo: "M", deudoresTotal: 9604,  deudoresMora: 3156,  montoTotal: 10472074,  montoMora: 3191124,  montoPromTotal: 747.04,  montoPromMora: 764.89 },
      { rango: "25-34",    sexo: "F", deudoresTotal: 32016, deudoresMora: 9332,  montoTotal: 63992192,  montoMora: 14505739, montoPromTotal: 1150.03, montoPromMora: 1050.61 },
      { rango: "25-34",    sexo: "M", deudoresTotal: 30977, deudoresMora: 10128, montoTotal: 89779523,  montoMora: 22049262, montoPromTotal: 1586.38, montoPromMora: 1376.70 },
      { rango: "35-44",    sexo: "F", deudoresTotal: 33143, deudoresMora: 8302,  montoTotal: 123461225, montoMora: 18917866, montoPromTotal: 1935.49, montoPromMora: 1419.83 },
      { rango: "35-44",    sexo: "M", deudoresTotal: 33445, deudoresMora: 9501,  montoTotal: 170919630, montoMora: 32220012, montoPromTotal: 2583.04, montoPromMora: 2015.01 },
      { rango: "45-54",    sexo: "F", deudoresTotal: 29893, deudoresMora: 6147,  montoTotal: 130606334, montoMora: 15204004, montoPromTotal: 2174.31, montoPromMora: 1484.77 },
      { rango: "45-54",    sexo: "M", deudoresTotal: 29366, deudoresMora: 6789,  montoTotal: 164186757, montoMora: 21861963, montoPromTotal: 2860.85, montoPromMora: 1926.16 },
      { rango: "55-64",    sexo: "F", deudoresTotal: 21209, deudoresMora: 3596,  montoTotal: 89560247,  montoMora: 10049213,  montoPromTotal: 2148.91, montoPromMora: 1634.02 },
      { rango: "55-64",    sexo: "M", deudoresTotal: 17686, deudoresMora: 3084,  montoTotal: 107391177, montoMora: 11849314, montoPromTotal: 3173.69, montoPromMora: 2316.13 },
      { rango: "65 o más", sexo: "F", deudoresTotal: 24835, deudoresMora: 3383,  montoTotal: 72482391,  montoMora: 7924585,  montoPromTotal: 1664.65, montoPromMora: 1412.33 },
      { rango: "65 o más", sexo: "M", deudoresTotal: 19473, deudoresMora: 2539,  montoTotal: 72372678,  montoMora: 6624192,  montoPromTotal: 2272.94, montoPromMora: 1616.45 }
    ],
    
    indicadores: [
      { icono: "joven",  valor: "21%",       label: "de los deudores esta conformado por jovenes (25-34 años)",                         nota: "3 de cada 10 de ellas está en mora",                                                              color: "teal" },
      { icono: "mayor",  valor: "15%",       label: "de los deudores esta conformado por adultos mayores (+65 años)",            nota: "El 13% de ellos se encuentra en mora",                                                              color: "teal" },
      { icono: "monto",  valor: "$ 1.370.0647", label: "Monto promedio de deuda entre jóvenes (25-34 años)",                                                                                  color: "azul" },
      { icono: "monto",  valor: "$ 1.921.588", label: "Monto promedio de deuda en adultos mayores (+65 años)",                                                                                                color: "azul" },
      { icono: "banco",  valor: "48%",       label: "de la deuda en mora está en los bancos",                                      color: "coral" },
      { icono: "tarjeta",valor: "25%",       label: "de la deuda en mora está en PNFC (emisoras no bancarias de tarjetas)",  color: "amarillo" }
    ]
  }
  
};
