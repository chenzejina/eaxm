<template>
  <div>
    <div class="box">
      <div class="topic">
        <div class="flex pd-5">
          <p class="items">所属题型：</p>
          <p class="item">全部(344)</p>
          <p class="item">单选题(144)</p>
          <p class="item">多选题(144)</p>
          <p class="item">判断题(14)</p>
          <p class="item"> 排序题(36)</p>
          <p class="item">填空题(45)</p>
        </div>
        <div class="flex pd-5">
          <p class="items">难易程度：</p>
          <p class="item">全部</p>
          <p class="item">简单</p>
          <p class="item">中等</p>
          <p class="item">困难</p>
        </div>
        <div class="flex pd-5">
            <p class="type">添加习题</p>
            <p class="type mr-20">批量导入</p>
            <p class="mr-20 type">加入公共习题库</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scope lang="scss">
    .topic{
        font-size: 14px;
        padding: 20px;
        background-color: #cccccc;
        & .item{ 
            width: 90px; 
            height: 30px;
            margin-left: 20px;
            line-height: 30px;
            border: 1px solid #4e4a4a;
            text-align: center;
            border-radius: 80px;
        }
        & .items{
            font-size: 18px;
        }
        & .type{
            width: 150px;
            height: 40px;
            border: 1px solid #0168e1;
            line-height: 40px;
            font-size: 18px;
            text-align: center;
            background-color: #0168e1;
            border-radius: 8px;
            color: #fff;
        }
    }
    .box{
        padding: 20px;
    }
</style>