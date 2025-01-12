using CatalogService from './cat-service';

//Property Level
annotate CatalogService.Books with {
  ID     @title: 'Book ID';
  title  @title: 'Book Title';
  genrename  @title: 'Genere';
  authorname @title: 'Author';
  price  @title: 'Price' ;       
  descr  @title: 'Description'  @UI.MultiLineText;
  stock  @title : 'Stocks';

}

// design level
annotate CatalogService.Books with @(

 // odata.draft.enabled,


  UI: {

    HeaderInfo      : {
      TypeName      : 'Book', 
      TypeNamePlural: 'Books',
      Title         : {
        $Type: 'UI.DataField', 
        Value: title
      },
      Description   : {
        $Type: 'UI.DataField',
        Value: descr
      }
    },
    SelectionFields : [
      title,
      authorname,
      genrename
    ],
    LineItem        : [
      {
        Value: ID,
        $Type: 'UI.DataField'
      },
      {Value: title},
      {Value: authorname},
      {Value: genrename},
      {Value: stock },                    
      {Value:price}
    ],

    Facets          : [{
      $Type : 'UI.ReferenceFacet',
      Label : 'General Information',
      Target: '@UI.FieldGroup#Main'
    }],
    FieldGroup#Main: {
      $Type: 'UI.FieldGroupType',
      Data : [
        {

          $Type: 'UI.DataField',
          Value: ID
        },
        {
          $Type: 'UI.DataField',
          Value: title

        },
            {
          $Type: 'UI.DataField',
          Value: descr

        },
        {
          $Type: 'UI.DataField',
          Value: authorname

        },
         {
          $Type: 'UI.DataField',
          Value: stock

        }
      ]
    }

  },
) {

};
