
let view;
let map;
let expandInfo;
document.getElementById('info').style.display = 'none';
function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    require([moduleName], (module) => {
      if (module) {
        resolve(module);
      } else {
        reject(new Error(`Module not found: ${moduleName}`));
      }
    }, (error) => {
      reject(error);
    });
  });
}

async function initializeHeatMap() {
  try {
    const [esriConfig, intl, Map, MapView, reactiveUtils, GeoJSONLayer, FeatureLayer, Legend, Expand] =
      await Promise.all([
        loadModule("esri/config"),
        loadModule("esri/intl"),
        loadModule("esri/Map"),
        loadModule("esri/views/MapView"),
        loadModule("esri/core/reactiveUtils"),
        loadModule("esri/layers/GeoJSONLayer"),
        loadModule("esri/layers/FeatureLayer"),
        loadModule("esri/widgets/Legend"),
        loadModule("esri/widgets/Expand"),
      ]);

    intl.setLocale("ar");
    // esriConfig.apiKey = "AAPK67a9b2041fcc449d90ab91d6bae4a156HTaBtzlYSKLe8L-zBuIgrSGvxOopzVQEtdwVrlp6RKN9Rrq_y2qkTax7Do1cHqm9";
    esriConfig.apiKey = "AAPKe96926c67dfd4afb80185e0a1020deafnvFzsj9yYBaj80DS9MWNWPGhkV_K-kXKNIkOzspRqvQ4fQkbcRrhPVfkFafbB1zt";

    let url = "https://services6.arcgis.com/iJvPfNHiyOlxpESW/arcgis/rest/services/rejected/FeatureServer/0";
    const renderer = {
      type: "heatmap",
      colorStops: [
        { color: [133, 193, 200, 0], ratio: 0 },
        { color: [133, 193, 200, 0], ratio: 0.01 },
        { color: [133, 193, 200, 255], ratio: 0.01 },
        { color: [133, 193, 200, 255], ratio: 0.01 },
        { color: [144, 161, 190, 255], ratio: 0.0925 },
        { color: [156, 129, 132, 255], ratio: 0.175 },
        { color: [167, 97, 170, 255], ratio: 0.2575 },
        { color: [175, 73, 128, 255], ratio: 0.34 },
        { color: [184, 48, 85, 255], ratio: 0.4225 },
        { color: [192, 24, 42, 255], ratio: 0.505 },
        { color: [200, 0, 0, 255], ratio: 0.5875 },
        { color: [211, 51, 0, 255], ratio: 0.67 },
        { color: [222, 102, 0, 255], ratio: 0.7525 },
        { color: [233, 153, 0, 255], ratio: 0.835 },
        { color: [244, 204, 0, 255], ratio: 0.9175 },
        { color: [255, 255, 0, 255], ratio: 1 },
      ],
      maxDensity: 0.01,
      minDensity: 0,
    };

    map = new Map({
      basemap: "gray-vector",
      // layers: [layer01]
    });

    view = new MapView({
      container: "viewDiv",
      center: [43.417931, 17.778259], // long and lat for KSA
      zoom: 6,
      map: map
    });


      let layer01 = new FeatureLayer({
        url: url,
        title: "البيانات الوصفية",
        popupTemplate: {
          title: "{اسم الامانة}, {اسم البلدية}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "رقم_الاعتراض",
                  label: "رقم_الاعتراض",
                },
                {
                  fieldName: "نوع الرقابة",
                  label: "نوع الرقابة",
                },
                {
                  fieldName: "رقم هوية المراقب",
                  label: "رقم هوية المراقب",
                },
                {
                  fieldName: "اسم المراقب",
                  label: "اسم المراقب",
                },
                {
                  fieldName: "رقم هاتف المراقب",
                  label: "رقم هاتف المراقب",
                },
                {
                  fieldName: "رقم هوية المعترض",
                  label: "رقم هوية المعترض",
                },
                {
                  fieldName: "اسم المعترض",
                  label: "اسم المعترض",
                },
                {
                  fieldName: "حالة الاعتراض",
                  label: "حالة الاعتراض",
                },
                {
                  fieldName: "قرار العضو",
                  label: "قرار العضو",
                },
                {
                  fieldName: "اللائحة",
                  label: "اللائحة",
                },
                {
                  fieldName: "تاريخ_تقديم_الاعتراض",
                  label: "تاريخ_تقديم_الاعتراض",
                },
                {
                  fieldName: "متوسط_المده_بين_بدايه_الاعتراض_",
                  label: "متوسط_المده_بين_بدايه_الاعتراض_",
                },
                {
                  fieldName: "رقم_بند_اللائحة",
                  label: "رقم_بند_اللائحة",
                },
                {
                  fieldName: "رقم_الزيارة",
                  label: "رقم_الزيارة",
                },
                {
                  fieldName: "قيمة_المخالفة",
                  label: "قيمة_المخالفة",
                },
                {
                  fieldName: "رقم_هوية_العضو",
                  label: "رقم_هوية_العضو",
                },
                {
                  fieldName: "اسم_عضو_اللجنة",
                  label: "اسم_عضو_اللجنة",
                },
                {
                  fieldName: "اسم_المالك",
                  label: "اسم_المالك",
                },
                {
                  fieldName: "رقم_هوية_المالك",
                  label: "رقم_هوية_المالك",
                },
                {
                  fieldName: "بند_المخالفة",
                  label: "بند_المخالفة",
                },
                {
                  fieldName: "بند_المخالفة_الفرعي",
                  label: "بند_المخالفة_الفرعي",
                },
                {
                  fieldName: "سبب_الاعتراض",
                  label: "سبب_الاعتراض",
                },
                {
                  fieldName: "نوع_الاعتراض",
                  label: "نوع_الاعتراض",
                },
              ],
            },
          ],
        },
        renderer: renderer,
        labelsVisible: true,
      });
      map.add(layer01);

      Promise.all([
        view.whenLayerView(layer01),
        // view.whenLayerView(fLayer2)
      ]).then(([layerView1, layerView2]) => {
        return Promise.all(
          [
            reactiveUtils.whenOnce(() => !layerView1.updating),
            // reactiveUtils.whenOnce(() => !layerView2.updating)
          ]
        );
      }).then(() => {
        console.log("done updating")
        view.goTo(
          {
            target: layer01.fullExtent,
          },
          {
            duration: 2000,
          }
        );
        let numFeatures01;
        layer01.queryFeatureCount().then(function(numFeatures){
          // prints the total count to the console
          numFeatures01 = numFeatures;
          console.log(numFeatures, "numFeaturesnumFeaturesnumFeaturesnumFeatures");
          document.getElementById('info').style.display = 'block';
          document.getElementById('h44').innerHTML = numFeatures;
          expandInfo = new Expand({
            expandTooltip: "اضغط للحصول على العدد الاجمالى",
            collapseTooltip: "اغلاق",
            expanded: true,
            view: view,
            content: document.getElementById("info")
          });
          view.ui.add(expandInfo, {
            position: "top-left",
            index: 5
          });
        });




        const heatmapRenderer = layer01.renderer.clone();
        // The following simple renderer will render all points as simple
        // markers at certain scales
        const simpleRenderer = {
          type: "simple",
          symbol: {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: "https://daraobeirne.github.io/kisspng-drawing-pin-world-map-logo-push-vector-5ae029f6ddeaf4.198342921524640246909.png",
            width: "30px",
            height: "30px"
          }
        };

        // When the scale is larger than 1:72,224 (zoomed in passed that scale),
        // then switch from a heatmap renderer to a simple renderer. When zoomed
        // out beyond that scale, switch back to the heatmap renderer
        reactiveUtils.watch(
          () => view.scale,
          (scale) => {
            layer01.renderer = scale <= 72224 ? simpleRenderer : heatmapRenderer;
          }
        );


      });



    // $.getJSON("./1010.json", function (data) {
    //   let layer01 = new GeoJSONLayer({
    //     url: "./1010.json",
    //     title: "البيانات الوصفية",
    //     popupTemplate: {
    //       title: "{الامانة}, {البلدية}",
    //       content: [
    //         {
    //           type: "fields",
    //           fieldInfos: [
    //             {
    //               fieldName: "رقم_الزيارة",
    //               label: "رقم_الزيارة",
    //             },
    //             {
    //               fieldName: "اسم_المراقب",
    //               label: "اسم المراقب",
    //             },
    //             {
    //               fieldName: "هوية_المراقب",
    //               label: "هوية المراقب",
    //             },
    //             {
    //               fieldName: "تاريخ_ووقت_الاسناد",
    //               label: "تاريخ ووقت الاسناد",
    //             },
    //             {
    //               fieldName: "نوع_الرقابة",
    //               label: "نوع الرقابة",
    //             },
    //             {
    //               fieldName: "حالة_الزيارة",
    //               label: "حالة الزيارة",
    //             },
    //             {
    //               fieldName: "نوع_الزيارة",
    //               label: "نوع_الزيارة",
    //             },
    //             {
    //               fieldName: "اسم_المراجع",
    //               label: "اسم_المراجع",
    //             },
    //             {
    //               fieldName: "اسم_المعتمد",
    //               label: "اسم_المعتمد",
    //             },
    //             {
    //               fieldName: "اسم_النشاط_التفصيلي",
    //               label: "اسم النشاط التفصيلي",
    //             },
    //             {
    //               fieldName: "رقم_الزيارة",
    //               label: "رقم_الزيارة",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     renderer: renderer,
    //     labelsVisible: true,
    //   });
    //   map.add(layer01);

    //   Promise.all([
    //     view.whenLayerView(layer01),
    //     // view.whenLayerView(fLayer2)
    //   ]).then(([layerView1, layerView2]) => {
    //     return Promise.all(
    //       [
    //         reactiveUtils.whenOnce(() => !layerView1.updating),
    //         // reactiveUtils.whenOnce(() => !layerView2.updating)
    //       ]
    //     );
    //   }).then(() => {
    //     console.log("done updating")
    //     view.goTo(
    //       {
    //         target: layer01.fullExtent,
    //       },
    //       {
    //         duration: 2000,
    //       }
    //     );

    //     const heatmapRenderer = layer01.renderer.clone();
    //     // The following simple renderer will render all points as simple
    //     // markers at certain scales
    //     const simpleRenderer = {
    //       type: "simple",
    //       symbol: {
    //         type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    //         url: "https://daraobeirne.github.io/kisspng-drawing-pin-world-map-logo-push-vector-5ae029f6ddeaf4.198342921524640246909.png",
    //         width: "30px",
    //         height: "30px"
    //       }
    //     };

    //     // When the scale is larger than 1:72,224 (zoomed in passed that scale),
    //     // then switch from a heatmap renderer to a simple renderer. When zoomed
    //     // out beyond that scale, switch back to the heatmap renderer
    //     reactiveUtils.watch(
    //       () => view.scale,
    //       (scale) => {
    //         layer01.renderer = scale <= 72224 ? simpleRenderer : heatmapRenderer;
    //       }
    //     );


    //   });

    // });



  await view.when(() => {
  });
  


  addWidgets()
      .then(([view, displayMap]) => {
        console.log(
          "Widgets Returned From Require Scope",
          view,
          displayMap,
          featureLayer
        );
        // You can work with the view object here
      })
      .catch((error) => {
        // Handle any errors here
      });


    return [view, map];
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }

}



// calling
initializeHeatMap()
  .then(() => {
    console.log("Map Returned From Require Scope", displayMap);
    // You can work with the view object here
  })
  .catch((error) => {
    // Handle any errors here
  });



async function addWidgets() {
  try {
    // await initializeMap();

    const [
      Fullscreen,
      BasemapGallery,
      Expand,
      ScaleBar,
      AreaMeasurement2D,
      Search,
      Home,
      LayerList,
      Legend
    ] = await Promise.all([
      loadModule("esri/widgets/Fullscreen"),
      loadModule("esri/widgets/BasemapGallery"),
      loadModule("esri/widgets/Expand"),
      loadModule("esri/widgets/ScaleBar"),
      loadModule("esri/widgets/AreaMeasurement2D"),
      loadModule("esri/widgets/Search"),
      loadModule("esri/widgets/Home"),
      loadModule("esri/widgets/LayerList"),
      loadModule("esri/widgets/Legend"),
    ]);

    var basemapGallery = new BasemapGallery({
      view: view,
    });

    var Expand22 = new Expand({
      view: view,
      content: basemapGallery,
      expandIcon: "basemap",
      group: "top-right",
      // expanded: false,
      expandTooltip: "اضغط لفتح معرض الخرائط",
      collapseTooltip: "اغلاق",
    });
    view.ui.add([Expand22], { position: "top-right", index: 6 });

    var fullscreen = new Fullscreen({
      view: view,
    });
    view.ui.add(fullscreen, "top-right");

    var scalebar = new ScaleBar({
      view: view,
      unit: "metric",
    });
    view.ui.add(scalebar, "bottom-right");

    let legend = new Legend({
      view: view,
    });
    
    view.ui.add(legend, "bottom-left");


    var search = new Search({
      //Add Search widget
      view: view,
    });
    view.ui.add(search, { position: "top-left", index: 0 }); //Add to the map

    var homeWidget = new Home({
      view: view,
    });
    view.ui.add(homeWidget, "top-left");


    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event) {
        var item = event.item;
        // displays the legend for each layer list item
        item.panel = {
          content: "legend",
        };
      },
      showLegend: true,
    });

    layerList.visibilityAppearance = "checkbox";
    var Expand5 = new Expand({
      view: view,
      content: layerList,
      expandIcon: "layers",
      group: "top-right",
      // expanded: false,
      expandTooltip: "قائمه الطبقات",
      collapseTooltip: "اغلاق",
    });
    Expand5.expanded = true;
    view.ui.add([Expand5], { position: "top-left", index: 6 });



    await view.when();

    return [view, map]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

