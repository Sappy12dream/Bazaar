to be edit
app.use(express.static(path.join(\_\_dirname, "../frontend/build")));

app.get("\*", (req, res) => {
res.sendFile(path.resolve(\_\_dirname, "../frontend/build/index.html"));
});
