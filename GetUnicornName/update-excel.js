const fs = require('fs');
const path = 'C:\\Users\\5-903\\Documents\\UiPath\\GetUnicornName\\Main.xaml';
let c = fs.readFileSync(path, 'utf8');

// Add namespace declarations
c = c.replace(
  'xmlns:excel="clr-namespace:UiPath.Excel.Activities;assembly=UiPath.Excel.Activities"',
  'xmlns:excel="clr-namespace:UiPath.Excel.Activities;assembly=UiPath.Excel.Activities"\n  xmlns:ueab="clr-namespace:UiPath.Excel.Activities.Business;assembly=UiPath.Excel.Activities"\n  xmlns:ue="clr-namespace:UiPath.Excel;assembly=UiPath.Excel.Activities"'
);

// Replace ReadRange with ExcelProcessScopeX opening + ExcelApplicationCard + ReadRangeX
c = c.replace(
  /<excel:ReadRange[^>]*DisplayName="Read Names from Excel"[^>]*\/>/,
  `<ueab:ExcelProcessScopeX DisplayName="Excel Process Scope" sap2010:WorkflowViewState.IdRef="ExcelProcessScopeX_1">\n      <ueab:ExcelProcessScopeX.Body>\n        <ActivityAction x:TypeArguments="ui:IExcelProcess">\n          <ActivityAction.Argument>\n            <DelegateInArgument x:TypeArguments="ui:IExcelProcess" Name="ExcelProcessScopeTag" />\n          </ActivityAction.Argument>\n          <Sequence DisplayName="Do">\n            <ueab:ExcelApplicationCard WorkbookPath="[&quot;C:\\Users\\5-903\\Downloads\\ชื่อไทยพร้อมวันเดือนปีเกิด.xlsx&quot;]" AutoSave="True" CreateNewFile="False" ReadOnly="False" DisplayName="Use Excel File" sap2010:WorkflowViewState.IdRef="ExcelApplicationCard_1">\n              <ueab:ExcelApplicationCard.Body>\n                <ActivityAction x:TypeArguments="ue:IWorkbookQuickHandle">\n                  <ActivityAction.Argument>\n                    <DelegateInArgument x:TypeArguments="ue:IWorkbookQuickHandle" Name="Excel" />\n                  </ActivityAction.Argument>\n                  <Sequence DisplayName="Do">\n                    <ueab:ReadRangeX Range="[Excel.Sheet(&quot;Sheet1&quot;).Range(&quot;A1&quot;)]" HasHeaders="True" SaveTo="[dtNames]" DisplayName="Read Names from Excel" sap2010:WorkflowViewState.IdRef="ReadRangeX_1" />`
);

// Replace WriteCell with WriteCellX
c = c.replace(
  /<excel:WriteCell[^>]*DisplayName="Write Unicorn Name to Excel"[^>]*\/>/,
  `<ueab:WriteCellX Cell="[Excel.Sheet(&quot;Sheet1&quot;).Cell(&quot;C&quot; &amp; (rowIndex + 2).ToString)]" Value="[unicornName]" DisplayName="Write Unicorn Name to Excel" sap2010:WorkflowViewState.IdRef="WriteCellX_1" />`
);

// Add closing tags after </uix:NApplicationCard> before </Sequence> (Main Sequence)
c = c.replace(
  /(    <\/uix:NApplicationCard>)\n(  <\/Sequence>)/,
  `$1\n                  </Sequence>\n                </ActivityAction>\n              </ueab:ExcelApplicationCard.Body>\n            </ueab:ExcelApplicationCard>\n          </Sequence>\n        </ActivityAction>\n      </ueab:ExcelProcessScopeX.Body>\n    </ueab:ExcelProcessScopeX>\n$2`
);

fs.writeFileSync(path, c);
console.log('Main.xaml updated successfully');
