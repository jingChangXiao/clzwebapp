/**
* @file 文件说明
* @author xjc
* @date
*/
<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column v-for="(item, index) in tableHeaders" :min-width="item.width" :label="item.name" :key="index">
          <template slot-scope="scope">
            {{scope.row[index][tableHeaders[index].prop]}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  // var a = 4
  // dataTile = [{'name': 'l1', key: 'id', type: 'cloe', t},{}
  // ]
  let dataTitle = [
    {id: 'value', name: '班别'},
    {id: 'value1', name: '片区'},
    {id: 'value2', name: '考试科目'},
    {id: 'value2', name: '考试'},
    {id: 'value3', name: '人数'},
    {id: 'value4', name: '毕业率'}
  ]
  let dataO = [
    // {value: '班别1', value1: '片区1', value2: '科目1', value3: 10, value4: '80％', id: 0, id1: 1},
    // {value: '班别1', value1: '片区1', value2: '科目3', value3: 30, value4: '80％', id: 0, id1: 1},
    // {value: '班别1', value1: '片区2', value2: '科目1', value3: 40, value4: '80％', id: 0, id1: 2},
    // {value: '班别1', value1: '片区2', value2: '科目3', value3: 50, value4: '80％', id: 0, id1: 2},
    // {value: '班别1', value1: '片区2', value2: '科目4', value3: 50, value4: '80％', id: 0, id1: 2},
    // {value: '班别1', value1: '片区3', value2: '科目1', value3: 60, value4: '80％', id: 0, id1: 3},
    // {value: '班别1', value1: '片区3', value2: '科目3', value3: 70, value4: '80％', id: 0, id1: 3},
    // {value: '班别1', value1: '片区3', value2: '科目2', value3: 80, value4: '80％', id: 0, id1: 3},
    // {value: '班别1', value1: '片区4', value2: '科目1', value3: 90, value4: '80％', id: 0, id1: 4},
    // {value: '班别1', value1: '片区4', value2: '科目2', value3: 100, value4: '80％', id: 0, id1: 4},
    // {value: '班别1', value1: '片区4', value2: '科目3', value3: 110, value4: '80％', id: 0, id1: 4}
    // {id: 'aa', id2: 'bbb',id3: 'ccc', col4: '4'}
    // {id: 'aa', id2: 'bbb',id3: 'ccc', col4: '4'}
    [{id: 0, value: '班别1'}, {id: 1, value1: '片区1'}, {id: 1, value2: '科目1'}, {id: 1, value2: '呜'}, {id: 1, value3: 10, add: true}, {id: 1, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 1, value1: '片区1'}, {id: 2, value2: '科目1'}, {id: 2, value2: '呜'}, {id: 2, value3: 20, add: true}, {id: 2, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 2, value1: '片区2'}, {id: 3, value2: '科目2'}, {id: 3, value2: '呜'}, {id: 3, value3: 60, add: true}, {id: 3, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 2, value1: '片区2'}, {id: 4, value2: '科目2'}, {id: 4, value2: '呜'}, {id: 4, value3: 30, add: true}, {id: 4, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 11, value1: '片区11'}, {id: 5, value2: '科目11'}, {id: 5, value2: '呜'}, {id: 5, value3: 40, add: true}, {id: 5, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 11, value1: '片区11'}, {id: 6, value2: '科目11'}, {id: 6, value2: '呜'}, {id: 6, value3: 50, add: true}, {id: 6, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 11, value1: '片区11'}, {id: 7, value2: '科目11'}, {id: 7, value2: '呜'}, {id: 7, value3: 60, add: true}, {id: 7, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 22, value1: '片区22'}, {id: 8, value2: '科目22'}, {id: 8, value2: '呜'}, {id: 8, value3: 70, add: true}, {id: 8, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 22, value1: '片区22'}, {id: 9, value2: '科目22'}, {id: 9, value2: '呜'}, {id: 9, value3: 80, add: true}, {id: 9, add: true, value4: '80％'}],
    [{id: 0, value: '班别1'}, {id: 22, value1: '片区22'}, {id: 10, value2: '科目22'}, {id: 10, value2: '呜'}, {id: 10, value3: 90, add: true}, {id: 10, add: true, value4: '80％'}],
    [{id: 1, value: '班别2'}, {id: 33, value1: '片区22'}, {id: 11, value2: '科目11'}, {id: 11, value2: '呜'}, {id: 11, value3: 90, add: true}, {id: 11, add: true, value4: '80％'}],
    [{id: 1, value: '班别2'}, {id: 33, value1: '片区22'}, {id: 12, value2: '科目11'}, {id: 12, value2: '呜'}, {id: 12, value3: 90, add: true}, {id: 12, add: true, value4: '80％'}],
    [{id: 1, value: '班别2'}, {id: 33, value1: '片区22'}, {id: 13, value2: '科目22'}, {id: 13, value2: '呜'}, {id: 13, value3: 90, add: true}, {id: 13, add: true, value4: '80％'}],
    [{id: 1, value: '班别2'}, {id: 33, value1: '片区22'}, {id: 14, value2: '科目22'}, {id: 14, value2: '呜'}, {id: 14, value3: 90, add: true}, {id: 14, add: true, value4: '80％'}]
  ]
  let cacheData = []
  let cacheId = []
  let cacheIndex = []
  export default {
    data () {
      return {
        tableData: [],
        tableHeaders: []
      }
    },
    mounted () {
      let arr = []
      dataTitle.forEach((item) => {
        let o = {}
        o.name = item.name
        o.prop = item.id
        // o.width = 80
        arr.push(o)
      })
      this.tableHeaders = arr
      this.firstStep()
      this.secondStep()
      this.tableData = dataO
    },
    methods: {
      objectSpanMethod ({row, column, rowIndex, columnIndex}) {
        let colNum = cacheData[rowIndex][columnIndex]
        if (colNum < 2) {
          return {
            rowspan: colNum,
            colspan: colNum
          }
        } else {
          return {
            rowspan: colNum,
            colspan: 1
          }
        }
      },
      firstStep () {
        // 记录操作次数
        let handelNum = 0
        let self = this
        dataO.forEach((q, index) => {
          let t = dataO[index + handelNum]
          let t1 = dataO[index + handelNum + 1]
          if (!t1) return
          // if (t[0].id === t1[0].id && t[1].id !== t1[1].id) {
          if (t[1].id !== t1[1].id) {
            let mark = index + handelNum
            // debugger
            let arr = []
            t.forEach((data, d) => {
              // debugger
              if (d < 2) {
                arr.push(Object.assign({}, data))
              } else if (d === 2) {
                let obj = Object.assign({}, data)
                obj[this.tableHeaders[d].prop] = '片区小计'
                obj.id += '77'
                arr.push(obj)
              } else {
                let result = 0
                let handle = false
                for (let i = 0; i < mark; i++) {
                  let o = dataO[i]
                  let o1 = dataO[i + 1]
                  if (t[0].id === o[0].id && t[1].id === o1[1].id) {
                    if (!handle && handelNum === 0) result = dataO[i][d][self.tableHeaders[d].prop]
                    handle = true
                    result += dataO[i + 1][d][self.tableHeaders[d].prop]
                  }
                }
                let obj = Object.assign({}, data)
                obj[this.tableHeaders[d].prop] = result
                obj.id += '77'
                arr.push(obj)
              }
            })
            handelNum++
            dataO.splice(index + handelNum, 0, arr)
          }
        })
        console.log(dataO)
      },
      secondStep () {
        dataO.forEach((t, index) => {
          cacheData[index] = []
          Array.isArray(t) && t.forEach((item, i) => {
            if (index === 0) {
              cacheData[0][i] = 1
              cacheId[i] = item.id
              cacheIndex[i] = 0
            } else {
              if (item.id === cacheId[i]) {
                cacheData[cacheIndex[i]][i]++
                cacheData[index][i] = 0
              } else {
                cacheIndex[i] = index
                cacheData[index][i] = 1
                cacheId[i] = item.id
              }
            }
          })
        })
        console.log(cacheData)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  td {
    vertical-align: middle;
    text-align: center;
  }
</style>
