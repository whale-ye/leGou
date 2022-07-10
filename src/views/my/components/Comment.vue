<template>
  <div>
    <div class="comment-box">
      <ul class="comment-list">
        <li class="comment-item">
          <p class="back">意见与反馈</p>
        </li>
        <li class="comment-item">
          <van-field
            v-model="message"
            rows="3"
            autosize
            label="留言"
            type="textarea"
            maxlength="150"
            placeholder="请填写你的意见和反馈"
            show-word-limit
            autofocus
          />
        </li>
        <li class="comment-item">
          <van-field v-model="mobile" label="联系方式" placeholder="邮箱/手机号/微信号" />
        </li>
      </ul>
      <div @click="submitComment" class="submit">提交</div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import { submitAction as submitActionApi } from "@/api/my/index.js";
export default {
  name: "Comment",
  data() {
    return {
      message: "",
      mobile: ""
    };
  },
  methods: {
    submitComment() {
      submitActionApi({
        phone:this.mobile,
        content:this.message
      }).then(res => {
        this.mobile='';
        this.message='';
        Toast({
            message:'\n\n提交成功\n\n\n'
        })
      });
    }
  },
  created() {
   
  },
};
</script>
<style lang="scss" scoped>
.comment-box {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding: 0 15px;
  .comment-list {
    width: 100%;
    line-height: 40px;
    .comment-item {
      border-bottom: 1px solid #ccc;
      .back {
        font-size: 15px;
      }
      ::v-deep span {
        font-size: 14px;
      }
    }
  }
  .submit {
    margin-top: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
    border-radius: 10px;
    height: 60px;
    widows: 100%;
    background-color: #b4282d;
  }
}
</style>