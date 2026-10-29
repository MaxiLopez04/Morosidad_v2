# Mora crediticia · Jujuy

## Estructura

```
jujuy-mora/
├── index.html                  # Solo estructura (HTML)
├── css/
│   └── styles.css              # Estilos
├── js/
│   ├── script.js               # Lógica principal (mapa, panel, gráficos, descargas)
│   ├── data/
│   │   ├── departamentos-geo.js   # Geometría SVG de los 16 departamentos
│   │   └── datos-por-mes.js       # Datos de cada período (DATOS_POR_MES)
│   └── vendor/
│       └── chart.umd.js        # Chart.js v4.4.4 (librería de terceros, no tocar)
├── assets/img/
│   └── logo.png                # Logo del encabezado
└── descargables/               # <<< ACÁ SE SUBEN LOS ARCHIVOS DE CADA MES
    ├── pdf/2026-06.pdf, 2026-07.pdf, 2026-08.pdf
    └── xlsx/2026-06.xlsx, 2026-07.xlsx, 2026-08.xlsx
```

## Dónde subir los descargables

Archivos reales, uno por mes y tipo, nombrados con el período `YYYY-MM`:

- `descargables/pdf/2026-09.pdf`
- `descargables/xlsx/2026-09.xlsx`

## Agregar un mes nuevo (ej. septiembre 2026)

1. Datos: en `js/data/datos-por-mes.js` copiar un bloque `"2026-08": {...}` y renombrarlo `"2026-09"`.
2. Descargables: subir `2026-09.pdf` y `2026-09.xlsx` a sus carpetas.
3. En `js/data/descargables.js` agregar `"2026-09"` a las listas `pdf` y `xlsx`.


