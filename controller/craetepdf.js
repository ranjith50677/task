import ChartJsImage from "chartjs-to-image";
import Answer from "../model/answer.js";

import pdfKit from "pdfkit";
import fs from "fs";

// import piechart from ""
// import plotly from 'plotly';
// import { log } from "console";

// let fontNormal = "Helvetica";
// let fontBold = "Helvetica-Bold";

let allreportchart = "./Allchart.png";
let piechart = "./studentreport.png";
let doughnut = "./subchart.png";

const createPdf = async (req, res) => {
  let data = [];
  try {
    let a = await Answer.find({})
      .populate("userId")
      .populate("AssginmentId")
      .populate("QuestionpaperId");
    // res.send(a);
    a.map((i, index) => {
      data.push({
        no: index + 1,
        name: i.userId.name,
        assignmentName: i.AssginmentId.AssginmentName,
        assignmentType: i.AssginmentId.Assginmenttype,
        assignmentSubject: i.AssginmentId.subject,
        totalMark: i.totalMark + "/" + i.QuestionpaperId.totaltestMark,
        Attend: i.Attend,
      });
    });

    // console.log(data);

    let pdfDoc = new pdfKit();

    let stream = fs.createWriteStream("./AllReport.pdf");
    pdfDoc.pipe(stream);

    pdfDoc.text("Student Mark List", 5, 5, {
      align: "center",
      width: 600,
    });
    pdfDoc.image(allreportchart, 100, 40, { width: 300, height: 150 });
    pdfDoc.rect(7, 203, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("SI NO", 20, 206, { width: 50 });
    pdfDoc.text("Name", 90, 206, { width: 50 });
    pdfDoc.text("AssgnimentName", 150, 206, { width: 100 });
    pdfDoc.text("unit", 270, 206, { width: 50 });
    // pdfDoc.text("Type", 400, 26, { width: 150 });
    pdfDoc.text("subject", 350, 206, { width: 50 });
    pdfDoc.text("Mark", 430, 206, { width: 50 });
    pdfDoc.text("Attended", 500, 206, { width: 50 });

    let productNo = 1;
    data.forEach((element) => {
      // console.log("adding", element.name);
      let y = 206 + productNo * 20;
      pdfDoc.fillColor("#000").text(element.no, 30, y, { width: 100 });
      pdfDoc.text(element.name, 90, y, { width: 190 });
      pdfDoc.text(element.assignmentName, 150, y, { width: 190 });
      pdfDoc.text(element.assignmentType, 260, y, { width: 100 });
      pdfDoc.text(element.assignmentSubject, 350, y, { width: 100 });
      pdfDoc.text(element.totalMark, 440, y, { width: 100 });
      pdfDoc.text(element.Attend, 500, y, { width: 100 });
      productNo++;
    });

    pdfDoc
      .rect(7, 206 + productNo * 20, 560, 0.2)
      .fillColor("#000")
      .stroke("#000");
    productNo++;

    // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

    pdfDoc.end();
    res.status(201).json({ path: "/AllReport.pdf" + "please open pdf" });
    // console.log("pdf generate successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default createPdf;

export const chartpdf = async (req, res) => {
  let arr = [];
  let data1 = [];
  let a = await Answer.find({}).populate("userId").populate("AssginmentId");
  a.map((i) => {
    arr.push(
      i.userId.name +
        " " +
        i.AssginmentId.Assginmenttype +
        " " +
        " " +
        i.AssginmentId.subject
    );
    data1.push(i.totalMark);
  });

  try {
    // Generate the chart
    const chart = new ChartJsImage();
    chart.setConfig({
      type: "bar",
      data: {
        labels: arr,
        datasets: [
          {
            label: "Users",
            data: data1,
          },
        ],
      },
    });

    // Save it
    chart.toFile("Allchart.png");
    res.status(201).json("yes");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const chart = async (req, res) => {
  let arr = [];
  let data1 = [];
  let a = await Answer.find({ class: req.query.class }).populate(
    "AssginmentId"
  );
  a.map((i) => {
    arr.push(i.AssginmentId.Assginmenttype);
    data1.push(i.totalMark);
  });

  try {
    // Generate the chart
    const chart = new ChartJsImage();
    chart.setConfig(
      {
        type: "doughnut",
        data: { labels: arr, datasets: [{ data: data1 }] },
        options: {
          plugins: {
            doughnutlabel: {
              labels: [{ text: "Total", font: { size: 20 } }],
            },
          },
        },
      }
    );

    // Save it
    chart.toFile("studentreport.png");
    res.status(201).json("yes");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const Report = async (req, res) => {
  let data = [];
  try {
    let a = await Answer.find({ userId: req.params.userId })
      .populate("userId")
      .populate("AssginmentId")
      .populate("QuestionpaperId");
    if (a)
      //  res.send(a);
      a.map((i, index) => {
        data.push({
          no: index + 1,
          name: i.userId.name,
          assignmentName: i.AssginmentId.AssginmentName,
          assignmentType: i.AssginmentId.Assginmenttype,
          assignmentSubject: i.AssginmentId.subject,
          totalMark: i.totalMark + "/" + i.QuestionpaperId.totaltestMark,
        });
      });

    // console.log(data);

    let pdfDoc = new pdfKit();

    let stream = fs.createWriteStream("./Report.pdf");
    pdfDoc.pipe(stream);

    pdfDoc.text("Student Mark List", 5, 5, {
      align: "center",
      width: 600,
    });
    //  pdfDoc.image(piechart, 100, 40, { width: 300, height: 150 });
    pdfDoc.rect(7, 23, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("SI NO", 20, 26, { width: 90 });
    pdfDoc.text("Name", 100, 26, { width: 190 });
    pdfDoc.text("AssgnimentName", 180, 26, { width: 190 });
    pdfDoc.text("unit", 300, 26, { width: 100 });
    // pdfDoc.text("Type", 400, 26, { width: 150 });
    pdfDoc.text("subject", 400, 26, { width: 150 });
    pdfDoc.text("Mark", 500, 26, { width: 100 });

    let productNo = 1;
    data.forEach((element) => {
      // console.log("adding", element.name);
      let y = 26 + productNo * 20;
      pdfDoc.fillColor("#000").text(element.no, 30, y, { width: 90 });
      pdfDoc.text(element.name, 90, y, { width: 190 });
      pdfDoc.text(element.assignmentName, 200, y, { width: 190 });
      pdfDoc.text(element.assignmentType, 300, y, { width: 100 });
      pdfDoc.text(element.assignmentSubject, 400, y, { width: 100 });
      pdfDoc.text(element.totalMark, 510, y, { width: 100 });
      productNo++;
    });

    pdfDoc
      .rect(7, 26 + productNo * 20, 560, 0.2)
      .fillColor("#000")
      .stroke("#000");
    productNo++;

    // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

    pdfDoc.end();
    res.status(201).json({ path: "./Report.pdf" + "open the file" });
    // console.log("pdf generate successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const subject = async (req, res) => {
  let data = [];
  let subject = req.query.subject;
  try {
    let b = await Answer.find({ subject: subject })
      .populate("AssginmentId")
      .populate("userId")
      .populate("QuestionpaperId");

    b.map((i, index) => {
      data.push({
        no: index + 1,
        name: i.userId.name,
        assignmentName: i.AssginmentId.AssginmentName,
        assignmentType: i.AssginmentId.Assginmenttype,
        assignmentSubject: i.AssginmentId.subject,
        totalMark: i.totalMark + "/" + i.QuestionpaperId.totaltestMark,
      });
    });

    // console.log(data);

    let pdfDoc = new pdfKit();

    let stream = fs.createWriteStream("./subReport.pdf");
    pdfDoc.pipe(stream);

    pdfDoc.text("Student subject Mark List", 5, 5, {
      align: "center",
      width: 600,
    });
    pdfDoc.image(doughnut, 100, 40, { width: 300, height: 150 });
    pdfDoc.rect(7, 203, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("SI NO", 20, 206, { width: 90 });
    pdfDoc.text("Name", 100, 206, { width: 190 });
    pdfDoc.text("AssgnimentName", 180, 206, { width: 190 });
    pdfDoc.text("unit", 300, 206, { width: 100 });
    // pdfDoc.text("Type", 400, 26, { width: 150 });
    pdfDoc.text("subject", 400, 206, { width: 150 });
    pdfDoc.text("Mark", 500, 206, { width: 100 });

    let productNo = 1;
    data.forEach((element) => {
      // console.log("adding", element.name);
      let y = 206 + productNo * 20;
      pdfDoc.fillColor("#000").text(element.no, 30, y, { width: 90 });
      pdfDoc.text(element.name, 90, y, { width: 190 });
      pdfDoc.text(element.assignmentName, 200, y, { width: 190 });
      pdfDoc.text(element.assignmentType, 300, y, { width: 100 });
      pdfDoc.text(element.assignmentSubject, 400, y, { width: 100 });
      pdfDoc.text(element.totalMark, 510, y, { width: 100 });
      productNo++;
    });

    pdfDoc
      .rect(7, 206 + productNo * 20, 560, 0.2)
      .fillColor("#000")
      .stroke("#000");
    productNo++;

    // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

    pdfDoc.end();
    res.status(201).json(b);
    // console.log("pdf generate successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const classtable = async (req, res) => {
  let data = [];
  let cls = req.query.cls;
  try {
    let b = await Answer.find({ class: cls })
      .populate("AssginmentId")
      .populate("userId")
      .populate("QuestionpaperId");
    b.map((i, index) => {
      data.push({
        no: index + 1,
        name: i.userId.name,
        assignmentName: i.AssginmentId.AssginmentName,
        assignmentType: i.AssginmentId.Assginmenttype,
        assignmentSubject: i.AssginmentId.subject,
        class: i.class,
        totalMark: i.totalMark + "/" + i.QuestionpaperId.totaltestMark,
      });
    });

    // console.log(data);

    let pdfDoc = new pdfKit();

    let stream = fs.createWriteStream("./clsReport.pdf");
    pdfDoc.pipe(stream);

    pdfDoc.text("Student ClassWise Mark List", 5, 5, {
      align: "center",
      width: 600,
    });
    pdfDoc.image(piechart, 100, 40, { width: 300, height: 150 });
    pdfDoc.rect(7, 203, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("SI NO", 20, 206, { width: 90 });
    pdfDoc.text("Name", 100, 206, { width: 190 });
    pdfDoc.text("AssgnimentName", 180, 206, { width: 190 });
    pdfDoc.text("unit", 300, 206, { width: 100 });
    pdfDoc.text("subject", 360, 206, { width: 150 });
    pdfDoc.text("class", 440, 206, { width: 150 });
    pdfDoc.text("Mark", 500, 206, { width: 100 });

    let productNo = 1;
    data.forEach((element) => {
      // console.log("adding", element.name);
      let y = 206 + productNo * 20;
      pdfDoc.fillColor("#000").text(element.no, 30, y, { width: 90 });
      pdfDoc.text(element.name, 90, y, { width: 190 });
      pdfDoc.text(element.assignmentName, 200, y, { width: 190 });
      pdfDoc.text(element.assignmentType, 300, y, { width: 100 });
      pdfDoc.text(element.assignmentSubject, 360, y, { width: 100 });
      pdfDoc.text(element.class, 450, y, { width: 100 });
      pdfDoc.text(element.totalMark, 510, y, { width: 100 });
      productNo++;
    });

    pdfDoc
      .rect(7, 206 + productNo * 20, 560, 0.2)
      .fillColor("#000")
      .stroke("#000");
    productNo++;

    // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

    pdfDoc.end();
    res.status(201).json(b);
    // console.log("pdf generate successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const subchart = async (req, res) => {
  let arr = [];
  let data1 = [];
  let a = await Answer.find({ subject: req.query.subject })
    .populate("AssginmentId")
    .populate("userId");
  a.map((i) => {
    arr.push(i.userId.name + " " + i.AssginmentId.Assginmenttype);
    data1.push(i.totalMark);
  });

  try {
    // Generate the chart
    const chart = new ChartJsImage();
    chart.setConfig({
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data1,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
        labels: arr,
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value) => {
              return value + "%";
            },
          },
        },
      },
    });

    // Save it
    chart.toFile("subchart.png");
    res.status(201).json("yes");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const markwise = async (req, res) => {
  let data = [];
  let totalMark = req.query.totalMark;
  try {
    let b = await Answer.find({ totalMark: totalMark })
      .populate("AssginmentId")
      .populate("userId")
      .populate("QuestionpaperId");

    b.map((i, index) => {
      data.push({
        no: index + 1,
        name: i.userId.name,
        assignmentName: i.AssginmentId.AssginmentName,
        assignmentType: i.AssginmentId.Assginmenttype,
        assignmentSubject: i.AssginmentId.subject,
        totalMark: i.totalMark + "/" + i.QuestionpaperId.totaltestMark,
      });
    });

    // console.log(data);

    let pdfDoc = new pdfKit();

    let stream = fs.createWriteStream("./Markwise.pdf");
    pdfDoc.pipe(stream);

    pdfDoc.text("Student Markwise List", 5, 5, {
      align: "center",
      width: 600,
    });
    let a = 26;
    // pdfDoc.image(doughnut, 100, 40, { width: 300, height: 150 });
    pdfDoc.rect(7, 23, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("SI NO", 20, a, { width: 90 });
    pdfDoc.text("Name", 100, a, { width: 190 });
    pdfDoc.text("AssgnimentName", 180, a, { width: 190 });
    pdfDoc.text("unit", 300, a, { width: 100 });
    // pdfDoc.text("Type", 400, 26, { width: 150 });
    pdfDoc.text("subject", 400, a, { width: 150 });
    pdfDoc.text("Mark", 500, a, { width: 100 });

    let productNo = 1;
    data.forEach((element) => {
      // console.log("adding", element.name);
      let y = 26 + productNo * 20;
      pdfDoc.fillColor("#000").text(element.no, 30, y, { width: 90 });
      pdfDoc.text(element.name, 90, y, { width: 190 });
      pdfDoc.text(element.assignmentName, 200, y, { width: 190 });
      pdfDoc.text(element.assignmentType, 300, y, { width: 100 });
      pdfDoc.text(element.assignmentSubject, 400, y, { width: 100 });
      pdfDoc.text(element.totalMark, 510, y, { width: 100 });
      productNo++;
    });

    pdfDoc
      .rect(7, 26 + productNo * 20, 560, 0.2)
      .fillColor("#000")
      .stroke("#000");
    productNo++;

    // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

    pdfDoc.end();
    res.status(201).json(b);
    // console.log("pdf generate successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
