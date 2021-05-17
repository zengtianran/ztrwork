/**
 * echarts 按需引入模块
 */
// 引入echarts核心模块
import * as echarts from 'echarts/core'
// 引入图表模块，图表后缀都是Chart
import { PieChart, BarChart } from 'echarts/charts'
// 引入提示框、标题、直角坐标系等组件，组件后缀都为Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
// 引入echarts 渲染器，这里可选CanvasRenderer或者SVGRenderer
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])
export default echarts
